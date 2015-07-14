# jQuery pushMenu (jQuery.pushMenu.js)

## v2.0.7

> *pushMenu* is based on Manoela llic's [Multi Level Push Menu](https://github.com/codrops/MultiLevelPushMenu), but implemented with jQuery.

## Features

 - Multiple level menu support
 - Infinite menu level nesting
 - Cross browser compatibility (IE9+, Chrome, Firefox, Safari, Opera, Android Browser, iOS Safari)

## Usage

### Getting started

### Grab the code

#### Bower

    bower install --save push-menu

#### Node

    npm install push-menu --save

### Include the CSS

```
<link rel="stylesheet" href="dist/css/stylesheet.css" />
```

*There is also a SCSS file available inside the source*

### Include the Javascript

```
<script src="dist/js/jquery.pushMenu.min.js"></script>
```

### Setting up the html

    <div class="site">
        <div class="site-outer">
            <nav class="mp-menu mp-cover" id="mp-menu">
                <div class="mp-level">
                    <ul>
                        <li><a title="CLOSE X" href="javascript:;" class="mp-back">CLOSE X</a></li>
                        <li><a title="" href="/">Home</a></li>
                        <li><a title="" href="">Menu item 1</a></li>
                        <li><a title="Menu item 2" href="javascript:;">Menu item 2 ></a>
                            <div class="mp-level">
                                <a href="javascript:;" class="mp-back">BACK</a>
                            <strong>Menu item 2</strong>
                                <ul class="sub-menu third-level">
                                    <li><a title="" href="">Menu item 2.1</a></li>
                                    <li><a title="" href="">Menu item 2.2</a></li>
                                    <li><a title="" href="">Menu item 2.3</a></li>
                                    <li><a title="" href="">Menu item 2.4</a></li>
                                    <li><a title="" href="">Menu item 2.5</a></li>
                                </ul>
                            </div>
                        </li>
                        <li><a title="" href="">Menu item 3</a></li>
                        <li><a title="" href="">Menu item 4</a></li>
                        <li>

                            <a title="Menu item 5" href="javascript:;">Menu item 5 ></a>

                            <div class="mp-level">
                                <a href="javascript:;" class="mp-back">BACK</a>
                                <strong>Menu item 5</strong>
                                <ul class="sub-menu third-level">
                                    <li><a title="" href="">Menu item 5.1</a></li>
                                    <li><a title="" href="">Menu item 5.2</a></li>
                                    <li>
                                        <a title="Menu item 5.3" href="javascript:;">Menu item 5.3 ></a>
                                        <div class="mp-level">
                                        <a href="javascript:;" class="mp-back">BACK</a>
                                        <strong>Menu item 5.3</strong>
                                            <ul class="sub-menu third-level">
                                                <li><a title="" href="">Menu item 5.3.1</a></li>
                                                <li><a title="" href="">Menu item 5.3.2</a></li>
                                                <li><a title="" href="">Menu item 5.3.3 ></a></li>
                                                <li><a title="" href="">Menu item 5.3.4</a></li>
                                                <li><a title="" href="javascript:;">Menu item 5.3.5 ></a>

                                                    <div class="mp-level">
                                                        <a href="javascript:;" class="mp-back">BACK</a>
                                                        <strong>Menu item 5.3.5</strong>
                                                        <ul class="sub-menu third-level">
                                                            <li><a title="" href="">Menu item 5.3.5.1</a></li>
                                                            <li><a title="" href="">Menu item 5.3.5.2</a></li>
                                                        </ul>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>                                        
                                    <li><a title="" href="">Menu item 5.4</a></li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>

            <div class="site-wrapper">
                <div class="site-container">
                    <h1><a href="javascript:;" id="trigger" class="burger" title="Open"></a> jquery pushMenu v2.0.7</h1>

                    <h2>Site content</h2>

                </div>
            </div>
        </div>
    </div>


### Setting up the Javascript

    <script>
        
        $(document).ready(function(){
            $('#mp-menu').pushMenu({
                type: 'overlap',
                levelSpacing: 0,
                backClass: 'mp-back',
                trigger: '#trigger',
                pusher: '.site-outer',
                scrollTop: false
            });
        });
    </script>

### Options
   
    type: 'cover'                       // cover || overlap     -   Whether the menu level should overlap slightly or completely cover each other
    levelSpacing: 0                     // If the 'type' is set to overlap how much should be visible from the previous level
    backClass: 'mp-back'                // The back button class
    trigger: '#trigger'                 // What should open the menu on click / touch
    pusher: '.site-outer'               // What should be moved when the menu opens - The plugin relies on moving the site out of the way to make way for the menu
    scrollTop: false                    // true || false    -   If set to true when moving between levels the screen will automatically scroll back to the top

## Todos

 - Add some additional examples
 - IE8 to play nicely
 - Option to slide menu in from the right
 - Main content of the site should be fixed to the page when menu is open and not scroll with the menu
 - Add callback for onOpen
 - Add callback for onClose
 - Add method to open menu programmatically at a specific level
 - Add method to close menu
 - Add option to choose whether to close menu on body click
 - Add option if level has an arbitrary active class menu opens at this level again