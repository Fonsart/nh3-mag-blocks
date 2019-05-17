<?php
// phpcs:ignoreFile

namespace CliScripts;

use Composer\Script\Event;
use Composer\Installer\PackageEvent;
use Localheinz\Json\Printer\Printer;

use \CurlFile;
use \ZipArchive;

require_once 'utils.php';

class Releases {

	const COMMANDS       = array( 'delete', 'make', 'zip' );
	const VERSION_SYNTAX = '/v(\d\.){2}\d/';
	const WHITELIST      = array( 'major', 'minor', 'patch' );
	const JSON_INDENT    = '  ';

	/**
	 * Creates a new release using the semver syntax.
	 * The function accepts one argument, which is the type of the release, that must be one of the following values:
	 * * `major` - A major release up the major number of your semver, and reset the minor and patch numbers, i.e. going from v0.1.3 to v1.0.0
	 * * `minor` - A minor release up the minor number of your semver, and reset the patch number, i.e. going from v0.1.3 to v0.2.0
	 * * `patch` - A patch release up the patch number of your semver, i.e. going from v0.1.3 to v0.1.4
	 *
	 * The current version number is retrieved and bumped according to the given $type.
	 *
	 * After bumping the version number, it will be saved in both the plugin.json file and package.json file.
	 * Then, those file changes will be commited to git and tagged with a new git tag, whose name will be the new version number.
	 * Finally, these new commit and tag will be pushed to the current remote branch.
	 *
	 * @param string $type The type of release to make
	 */
	private static function make( string $type ) {
		if ( self::checkGitStatus() ) {
			$versions = self::bumpVersionNumber( $type );
			write(
				array(
					'INFO ---- Last version found was ' . $versions['last'],
					"INFO ---- Release type \"$type\" bumped the version to " . $versions['current'],
				)
			);
			if ( file_exists( 'plugin.json' ) ) {
				  self::updateJsonVersion( $versions['current'] );
			}
			// Update the package.json if it exists
			if ( file_exists( 'package.json' ) ) {
				self::updateJsonVersion( $versions['current'], array( 'file' => 'package.json' ) );
			}
			// Regenerate the plugin header file
			exec( 'composer plugin-header' );
			// Make new commit
			exec( 'git add .' );
			exec( 'git commit -m "Release new ' . $type . ' version - ' . $versions['current'] . '"' );
			write( 'INFO ---- New commit for the release.' );
			// Add new tag with the new version
			exec( 'git tag ' . $versions['current'] );
			write( 'INFO ---- New git tag "' . $versions['current'] . '" created.' );
			// Push changes to remote
			exec( 'git push && git push --tag' );
			write( 'SUCCESS - Release commit and tag pushed to remote branch' );
		}
	}

	/**
	 * Main entry point.
	 * Will execute an action based on the given parameters.
	 * @param Event $event A Composer Event object
	 */
	public static function route( Event $event ) {
		$args = $event->getArguments();
		// Incorrect number of arguments
		if ( sizeof( $args ) === 0 || sizeof( $args ) > 2 ) {
			write( 'ERROR --- You provided ' . sizeof( $args ) . ' argument' . ( sizeof( $args ) === 0 ? '' : 's' ) . '.' );
			self::writeHelp();
			exit();
		}
		$action = $args[0];
		// Delete action
		if ( $action === self::COMMANDS[0] ) {
			write( 'You wish to delete a release' );
			$version = isset( $args[1] ) ? $args[1] : null;
			if ( preg_match( self::VERSION_SYNTAX, $version ) ) {
				write( "You wish to delete the $version release" );
				self::delete( $version );
			} else {
				write(
					array(
						'Bad version argument',
						self::writeHelp(),
					)
				);
			}
			// Zip action
		} elseif ( $action === self::COMMANDS[2] ) {
			write( 'You wish to make a zip' );
			$version = isset( $args[1] ) ? $args[1] : null;
			if ( preg_match( self::VERSION_SYNTAX, $version ) ) {
				self::makeZipFolder( $version );
			} else {
				write(
					array(
						'Bad version argument',
						self::writeHelp(),
					)
				);
			}
			// Make action
		} elseif ( $action === self::COMMANDS[1] ) {
			write( 'You wish to make a release' );
			$type = isset( $args[1] ) ? $args[1] : null;
			if ( null !== $type && in_array( $type, self::WHITELIST ) ) {
				self::make( $type );
			} else {
				write(
					array(
						'Bad type argument',
						self::writeHelp(),
					)
				);
			}
			// Shortcut make action
		} elseif ( in_array( $action, self::WHITELIST ) ) {
			self::make( $action );
			// Unknown action - prints the help
		} else {
			write( self::writeHelp() );
		}
	}

	public static function writeHelp() {
		self::writeMakeHelp();
		write();
		self::writeDeleteHelp();
	}

	private static function writeMakeHelp() {
		write(
			array(
				'---------------------------------------',
				'Make and deploy a new release to GitLab',
				'',
				'Usage:',
				' composer release [make] <major|minor|patch>',
				'',
				'Arguments:',
				'  major ---- will increment the first number of the release version.',
				'             example: getting from a v1.2.3 to a v2.0.0',
				'  minor ---- will increment the second number of the release version.',
				'             example: getting from a v.1.2.3 to a v.1.3.0',
				'  patch ---- will increment the last number of the release version.',
				'             example: getting from a v.1.2.3 to a v.1.2.4',
				'Help:',
				'  Update the plugin.json file.',
				'  Regenerate a new [plugin-name].php file.',
				'  Create a zipfile containing the necessary plugin files.',
				'  Upload the zipfile to GitLab, using the settings in the .release.conf file.',
				'  Finally, create a new release on GitLab, attaching the uploaded zipfile.',
			)
		);
	}

	private static function writeDeleteHelp() {
		write(
			array(
				'-----------------------------',
				'Delete a release from GitLab',
				'',
				'Usage:',
				'  composer release delete <version>',
				'',
				'Arguments:',
				'  <version> - the version number of the release to delete.',
				'              Must respect the format "v(\d\.){2}\d\."',
				'Examples:',
				'  composer release delete v1.2.3',
				'  composer release delete v0.0.1',
				'',
				'Help:',
			)
		);
	}

	private static function delete( $version ) {
		write( "DELETED -- $version release" );
	}

	/**
	 * Retrieves the current version number from (by order of priority):
	 * * The latest git tag that matches the semver syntax, if any (TODO)
	 * * The version number in the plugin.json file, if it exists
	 * * The version number in the package.json file, if it exists
	 * * Defaults to v0.0.0 if none of the above apply
	 *
	 * @param string $type The type of version update.
	 * @return array An array with two item.
	 *                `last` contains the last version number.
	 *                `current` contains the new version number.
	 */
	private static function bumpVersionNumber( $type ) {
		$versions = array();
		exec( 'git tag -l', $tags ); // Get git tags
		if ( sizeof( $tags ) !== 0 ) {
			$versions['last'] = end( $tags );
		} elseif ( file_exists( 'plugin.json' ) ) {
			$versions['last'] = getVersionFrom( 'plugin.json' );
		} elseif ( file_exists( 'package.json' ) ) {
			$versions['last'] = getVersionFrom( 'package.json' );
		} else {
			$versions['last'] = 'v0.0.0';
		}
		$last_array    = explode( '.', str_replace( 'v', '', $versions['last'] ) );
		$current_array = array(
			'major' => (int) $last_array[0],
			'minor' => (int) $last_array[1],
			'patch' => (int) $last_array[2],
		);

		// Bump the version
		switch ( $type ) {
			case 'major':
				$current_array['major']++;
				$current_array['minor'] = 0;
				$current_array['patch'] = 0;
				break;
			case 'minor':
				$current_array['minor']++;
				$current_array['patch'] = 0;
				break;
			case 'patch':
				$current_array['patch']++;
				break;
		}
		$versions['current'] = 'v' . implode( '.', $current_array );
		return $versions;
	}

	/**
	 * Update the version number in the plugin.json file to the given $version number.
	 * You can change the file in which the version is updated by passing an $options array with
	 * a `file` item whose value contains the path to the file.
	 * @param string $version The version number
	 * @param array [$options] An options array
	 * @param string [$options['file']] The path to the file to update. Defaults to `plugin.json`
	 */
	private static function updateJsonVersion( string $version, array $options = array( 'file' => 'plugin.json' ) ) {
		$config          = loadConfigFrom( $options['file'] );
		$config->version = str_replace( 'v', '', $version );
		$printer         = new Printer();
		$printed         = $printer->print( json_encode( $config, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES ), self::JSON_INDENT );
		file_put_contents( $options['file'], $printed );
		write( "SUCCESS - {$options['file']} version has been updated to $version" );
	}

	/**
	 * Performs status checks on the repository.
	 * Ensure that there is no unstaged changes and no unpushed commits.
	 * @return boolean True if all checks passed, False otherwise.
	 */
	private static function checkGitStatus() {
		exec( 'git status --porcelain', $status );
		if ( sizeof( $status ) !== 0 ) {
			write(
				array(
					'ERROR --- You have unstaged changes in your repository...',
					'INFO ---- Please commit or stash them and retry.',
				)
			);
			return false;
		}
		exec( 'git log @{u}..', $commits );
		if ( sizeof( $commits ) !== 0 ) {
			write(
				array(
					'ERROR --- You have local commits that are not pushed to remote branch...',
					'INFO ---- Please push your local commits and retry.',
				)
			);
			return false;
		}
		return true;
	}

}
