/*
 *  jQuery pushMenu - v2.0.1
 *  
 *  Made by Richard Cox
 *  Under MIT License
 */
// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ($, window, document, undefined) {

    // undefined is used here as the undefined global variable in ECMAScript 3 is
    // mutable (ie. it can be changed by someone else). undefined isn't really being
    // passed in so we can ensure the value of it is truly undefined. In ES5, undefined
    // can no longer be modified.

    // window and document are passed through as local variable rather than global
    // as this (slightly) quickens the resolution process and can be more efficiently
    // minified (especially when both are regularly referenced in your plugin).

    // Create the defaults once
    var pluginName = "pushMenu",
        defaults = {
        // overlap: there will be a gap between open levels
        // cover: the open levels will be on top of any previous open level
        type : 'overlap', // overlap || cover
        levelSpacing : 0, // space between each overlaped level
        backClass : 'mp-back', // classname for the element (if any) that when clicked closes the current level
        trigger : '#trigger', // id || class of element to trigger the menu
        pusher: '#mp-pusher' // the container wrapper that will be moved when the menu is triggered
    };

    // The actual plugin constructor
    function Plugin (element, options) {
        this.element = element;
        // jQuery has an extend method which merges the contents of two or
        // more objects, storing the result in the first object. The first object
        // is generally empty as we don't want to alter the default options for
        // future instances of the plugin
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        
        if(window.navigator.userAgent.indexOf('MSIE 8') == -1)  {
            this.init();
        }
    }

    // Avoid Plugin.prototype conflicts
    $.extend(Plugin.prototype, {

        init: function () {
            // if menu is open or not
            this.open = false;

            // level depth
            this.level = 0;

            // the moving wrapper
            this.wrapper = $(this.settings.pusher)[0],

            // the mp-level elements
            this.levels = $('.mp-level', this.element);
            
            // save the depth of each of these mp-level elements
            var self = this;
            $.each(this.levels, function(i, element){
                level = self.getLevelDepth(element, self.element.id, 'mp-level');
                
                $(element).attr('data-level', level);
            });
            
            // the menu items
            this.menuItems = Array.prototype.slice.call(this.element.querySelectorAll('li'));
            
            // if type == "cover" these will serve as hooks to move back to the previous level
            this.levelBack = $('.' + this.settings.backClass, this.element);
            
            // event type (if mobile use touch events)
            this.eventtype = 'ontouchstart' in document.documentElement ? 'touchstart' : 'click';
            
            // add the class mp-overlap or mp-cover to the main element depending on options.type
            $(this.element).addClass('mp-' + this.settings.type);
            
            // initialize / bind the necessary events
            this._initEvents();
        },

        // returns the depth of the element "e" relative to element with id=id
        // for this calculation only parents with classname = waypoint are considered
        getLevelDepth : function(e, id, waypoint, cnt)  {
            var self = this;

            cnt = cnt || 0;
            if (e.id.indexOf(id) >= 0) return cnt;

            if($(e).hasClass(waypoint)) {
                ++cnt;
            }
            return e.parentNode && self.getLevelDepth(e.parentNode, id, waypoint, cnt);
        },

        isIE: function()    {
            var myNav = navigator.userAgent.toLowerCase();
            return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
        },

        // http://coveroverflow.com/a/11381730/989439
        mobilecheck : function()    {
            var check = false;
            (function(a){if(/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm(os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s)|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp(i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac(|\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt(|\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg(g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v)|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v)|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-|)|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
            return check;
        },

        // returns the closest element to 'e' that has class "classname"
        closest : function(e, classname)    {
            var self = this;

            if($(e).hasClass(classname))    {
                return e;
            }
            return e.parentNode && self.closest(e.parentNode, classname);
        },

        // taken from https://github.com/inuyaksa/jquery.nicescroll/blob/master/jquery.nicescroll.js
        hasParent : function(e, id) {
            if (!e) return false;
            var el = e.target||e.srcElement||e||false;
            while (el && el.id != id) {
                    el = el.parentNode||false;
            }
            return (el!==false);
        },

        _initEvents : function() {
            var self = this;

            // the menu should close if clicking somewhere on the body
            var bodyClickFn = function(el) {
                self._resetMenu();
                el.removeEventListener(self.eventtype, bodyClickFn);
            };

            // open (or close) the menu
            $(self.settings.trigger).on(this.eventtype, function(ev) {
                ev.stopPropagation();
                ev.preventDefault();
                if(self.open) {
                    self._resetMenu();
                }
                else {
                    self._openMenu();
                    // the menu should close if clicking somewhere on the body (excluding clicks on the menu)
                    document.addEventListener(self.eventtype, function(ev) {
                        if(self.open && !self.hasParent(ev.target, self.element.id)) {
                            bodyClickFn(this);
                        }
                    });
                }
            });

            // opening a sub level menu
            
            this.menuItems.forEach(function(el, i) {
                // check if it has a sub level
                var subLevel = el.querySelector('div.mp-level');
                if(subLevel) {
                    $('a', el).on(self.eventtype, function(ev) {

                        var level = self.closest(el, 'mp-level').getAttribute('data-level');
                        
                        if(self.level <= level) {
                            ev.stopPropagation();
                            $(self.closest(el, 'mp-level')).addClass('mp-level-overlay');
                            self._openMenu(subLevel);
                        }
                    });
                }
            });

            // closing the sub levels :
            // by clicking on the visible part of the level element
            $.each(this.levels, function(){
                var el = $(this);
                
                el.on(self.eventtype, function(ev){
                    ev.stopPropagation();
                    
                    var level = el.data('level');
                    
                    if(self.level > level) {
                        self.level = level;
                        self._closeMenu();
                    }
                });
            });
            
            // by clicking on a specific element
            $.each(this.levelBack, function(){
                var el = $(this);
                
                el.on(self.eventtype, function(ev){
                    ev.preventDefault();
                    
                    var handler = $(this, self);
                    var level = $(handler).closest('.mp-level').data('level');
                    
                    if(self.level <= level) {
                        ev.stopPropagation();
                        self.level = $(handler).closest('.mp-level').data('level') -1;
                        self.level === 0 ? self._resetMenu() : self._closeMenu();
                    }
                });
            });
        },
        _openMenu : function(subLevel) {
            // increment level depth
            ++this.level;

            // move the main wrapper
            var levelFactor = (this.level - 1) * this.settings.levelSpacing,
                translateVal = this.settings.type === 'overlap' ? this.element.offsetWidth + levelFactor : this.element.offsetWidth;

                this._setTransform(translateVal + 'px');

            if(subLevel) {
                // reset transform for sublevel
                this._setTransform('', subLevel);
                                        
                // need to reset the translate value for the level menus that have the same level depth and are not open
                for(var i = 0, len = this.levels.length; i < len; ++i) {
                    var levelEl = this.levels[i];
                    if(parseInt($(levelEl).data('level')) !== parseInt($(subLevel).data('level')) && !$(levelEl).hasClass('mp-level-open'))   {
                        this._setTransform('-100%', levelEl, -1*levelFactor + 'px');
                    }
                }
            }
            // add class mp-pushed to main wrapper if opening the first time
            if(this.level === 1) {
                $(this.wrapper).addClass('mp-pushed');
                this.open = true;
            }
            // add class mp-level-open to the opening level element
            $(subLevel || this.levels[0]).addClass('mp-level-open');
        },
        // close the menu
        _resetMenu : function() {
            this._setTransform(0);
            this.level = 0;
            // remove class mp-pushed from main wrapper
            $(this.wrapper).removeClass('mp-pushed');
            this._toggleLevels();
            this.open = false;
        },
        // close sub menus
        _closeMenu : function() {
            var translateVal = this.settings.type === 'overlap' ? this.element.offsetWidth + (this.level - 1) * this.settings.levelSpacing : this.element.offsetWidth;
            this._setTransform(translateVal);
            this._toggleLevels();
        },
        // translate the el
        _setTransform : function(val, el, secondaryVal) {
            el = el || this.wrapper;
            secondaryVal = secondaryVal || false;
            
            if(false !== this.isIE() && this.isIE() <= 9)   {
            
                secondaryVal = parseInt(secondaryVal) == 0 ? '-300px' : secondaryVal;
                
                $(el).animate({
                        left: val
                    }, 
                    'medium', function(){
                        if(false !== secondaryVal){
                            $(this).animate({
                                left: secondaryVal
                            });
                        }
                    }
                );

            } else {

                translate = '';
                
                if(val) {
                    translate = 'translate3d(' + val + ',0,0)';

                    if(false !== secondaryVal)   {
                        translate = translate + ' translate3d(' + secondaryVal + ',0,0)';
                    }
                }

                $(el).css({
                    '-webkit-transform' : translate,
                    '-moz-transform'    : translate,
                    '-ms-transform'     : translate,
                    '-o-transform'      : translate,
                    'transform'         : translate
                });
            }

        },
        // removes classes mp-level-open from closing levels
        _toggleLevels : function() {
            
            var $self = this;
            
            $.each(this.levels, function(){
                var levelEl = $(this);
                if(levelEl.data('level') >= $self.level + 1) {
                    
                    if(false !== $self.isIE() && $self.isIE() <= 9)   {
                        $(levelEl).animate({
                            left: '-300px'
                        },'medium');
                    }
                    
                    levelEl.removeClass('mp-level-open');
                    levelEl.removeClass('mp-level-overlay');
                }
                else if(Number(levelEl.data('level')) == $self.level) {
                    levelEl.removeClass('mp-level-overlay');
                }
            });
        }
    });

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[ pluginName ] = function (options) {
        this.each(function() {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin(this, options));
            }
        });

        // chain jQuery functions
        return this;
    };

})(jQuery, window, document);
