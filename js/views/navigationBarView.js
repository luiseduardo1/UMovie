/**
 * Created by Jean-Benoît on 2016-01-26.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'jscookie',
    'text!../templates/navigationBar.html',
    "models/navigationBarModel",
    'handlebars'
], function ($, _, Backbone, Cookie, navigationBarTemplate, NavigationBarModel, Handlebars) {

    var NavigationBarView = Backbone.View.extend({

            el: $('#menu-content'),

            initialize: function () {
                this.render();
            },

            render: function () {

                var template = Handlebars.compile(navigationBarTemplate);

                var source = new NavigationBarModel();
                if (Cookie.get('token') === undefined) {
                    source.disconnect();
                } else {
                    source.connect(Cookie.get('name'));
                }
                var resultNavigationBar = template(source.defaults);

                this.$el.html(resultNavigationBar);
            },


            events: {
                'click .hamburger': "toggleSlideOutMenu",
                'click .member-hamburger': "toggleMemberMenu",
                'click .cross': "closeHamburgerMenu",
                'click .go-research': "launchSearchFromButton",
                'press .search-input': "launchSearchFromInput"
            },

            toggleMenu: function (distance, buttonToShow, buttonToHide) {

            },

            toggleSlideOutMenu: function() {
                var slideOutMenu = document.getElementsByClassName("navigation-options")[0];
                document.getElementsByClassName("member-menu")[0].id = "member-menu-closed";
                if (slideOutMenu.id === "menu-open") {
                    slideOutMenu.id = "menu-closed";
                    document.getElementsByClassName("hamburger")[0]
                        .firstElementChild
                        .setAttribute("src", "img/hamburger_menu.svg");
                }
                else {
                    slideOutMenu.id = "menu-open";
                    document.getElementsByClassName("hamburger")[0]
                        .firstElementChild
                        .setAttribute("src", "img/cross_menu.svg");
                }
            },

            toggleMemberMenu: function() {
                var memberMenu = document.getElementsByClassName("member-menu")[0];
                document.getElementsByClassName("navigation-options")[0].id = "menu-closed";
                document.getElementsByClassName("hamburger")[0]
                    .firstElementChild
                    .setAttribute("src", "img/hamburger_menu.svg");
                if (memberMenu.id === "member-menu-open") {
                    memberMenu.id = "member-menu-closed";
                }
                else {
                    memberMenu.id = "member-menu-open";
                }
            },

            launchSearchFromButton: function (searchGoButton) {
                console.log(searchGoButton);
                var input = searchGoButton.target.previousSibling.valueOf();
                this.launchSearch(input);
            },

            launchSearch: function (inputText) {
                console.log(inputText);
            }

        })
        ;

    return NavigationBarView;
});