import { __ } from '@wordpress/i18n';

export const PHOTO_TYPE = __('photo');
export const AUDIO_TYPE = __('audio');
export const VIDEO_TYPE = __('video');
export const STORY_TYPE = __('story');
export const GALLERY_TYPE = __('gallery');
export const MEDIA_TYPE = __('media');

/**
 * Base Class that represents the content of an "On the same topic" link.
 * This class is extended below for each type of available link.
 */
export class Resource {

  /**
   * Creates a new Resource object.
   * @param {string} title The resource title
   * @param {string} cover The resource cover's URL
   * @param {Object} user The user that published the resource
   * @param {string} user.avatar_url The user's avatar URL
   * @param {string} user.name The user's complete name
   * @param {string} user.username The user's username (will only be used if no user.name exists)
   * @returns {Resource}
   */
  constructor(title, cover, { avatar_url, name, username }) {
    this.title = title || __('Untitled');
    this.cover = cover || "https://via.placeholder.com/360";
    this.user = {
      avatar: avatar_url || "https://via.placeholder.com/36",
      name: name || username
    };
  }

}

/**
 * Class that represents the content of an Audio "On the same topic" link.
 */
export class ResourceAudio extends Resource {

  /**
   * Creates a new ResourceAudio object based on a given API response
   * @param {Object} resourceData API Response object of an Audio entry
   */
  constructor(resourceData) {
    super(
      resourceData.title,
      resourceData.cover_url,
      resourceData.user
    );
    this.type = AUDIO_TYPE;
  }

}

/**
 * Class that represents the content of a Gallery "On the same topic" link.
 */
export class ResourceVideo extends Resource {

  /**
   * Creates a new ResourceVideo object based on a given API response
   * @param {Object} resourceData API Response object of an Audio entry
   */
  constructor(resourceData) {
    super(
      resourceData.title,
      resourceData.cover_url || resourceData.media.thumbnail_url,
      resourceData.user
    );
    this.type = VIDEO_TYPE;
  }

}

/**
 * Class that represents the content of a Story "On the same topic" link.
 */
export class ResourceStory extends Resource {

  /**
   * Creates a new ResourceStory object based on a given API response
   * @param {Object} resourceData API Response object of an Audio entry
   */
  constructor(resourceData) {
    super(
      resourceData.title,
      resourceData.cover_url,
      resourceData.user,
    );
    this.type = STORY_TYPE;
  }

}

/**
 * Class that represents the content of a Gallery "On the same topic" link.
 */
export class ResourceGallery extends Resource {

  /**
   * Creates a new ResourceGallery object based on a given API response
   * @param {Object} resourceData API Response object of an Audio entry
   */
  constructor(resourceData) {
    super(
      resourceData.title,
      resourceData.cover ? resourceData.cover.url : null,
      resourceData.user
    );
    this.nbDoc = resourceData.entries_count
    this.type = GALLERY_TYPE;
  }

}

/**
 * Class that represents the content of a Photo "On the same topic" link.
 */
export class ResourcePhoto extends Resource {

  /**
   * Creates a new ResourcePhoto object based on a given API response
   * @param {Object} resourceData API Response object of an Audio entry
   */
  constructor(resourceData) {
    super(
      resourceData.title,
      resourceData.media.thumbnail_url,
      resourceData.user
    );
    this.type = PHOTO_TYPE;
  }

}
