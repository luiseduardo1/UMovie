

define([
    'jquery',
    'underscore',
    'backbone',
    //'tmdb'
], function($, _, Backbone/*, theMovieDb*/) {
    var TmdbModel = Backbone.View.extend({


        initialize: function (searchRequest, imgClassName, bioClassName) {
            this.searchRequest = searchRequest;
            this.imgClassName = imgClassName;
            this.bioClassName = bioClassName;
            var that = this;
            that.getTmdbData();
        },


        getTmdbData: function () {
            'use strict';
            var that = this;



            var searchOptions = {
                query: that.searchRequest,
                page: 1,
                include_adult: true,
                search_Type: 'phrase'
            };
            console.log(searchOptions);

            var query = theMovieDb.common.generateQuery(searchOptions);


            var searchArtist = theMovieDb.search.getPerson(query, theMovieDb.successCB(data), theMovieDb.errorCB(data));
            var artistSearchInfo = searchArtist.results[0];
            var artistInfo = theMovieDb.people.getById({'id': artistSearchInfo.id}, successCD, errorCD);

            that.modifyBiography(artistInfo.biography);
            that.modifyImage(artistSearchInfo.profile_path);

        },

        modifyBiography: function (biography) {
            var that = this;
            $(that.bioClassName).each(function () {
                $(this).text(biography);

            });
            return this;
        },

        modifyImage: function (image) {
            var that = this;
            if (image) {
                var path = theMovieDb.images_uri + image;
                $(that.imgClassName).attr("src", path);
            }
            return this;
        }

    });
    return TmdbModel;
});