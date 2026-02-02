Enformation Redirect
====================

This is heavily inspired by [EZProxy Redirect Foxified](https://github.com/metronidazole/EZProxyRedirectFoxified)
so many thanks go to the original developers of that plugin.

Unfortunately, the [Enformation](https://www.e-nformation.ro) system used by
Romanian universities doesn't support EZProxy, so this extension builds an
equivalent redirecting system for it. This is mostly equivalent to writing it
yourself with more general add-ons such as [Redirector](https://addons.mozilla.org/en-US/firefox/addon/redirector/).

Changelog
---------

**Version 0.4.2** - January 29, 2025:
* Update some subscriptions to `AnelisPlus`.
* Add subscription to `Statista_UVT`.
* Update redirect patterns to new format.

**Version 0.4.1** - February 17, 2024:
* Use SVG icons.
* Change icon color on websites we can redirect.

**Version 0.4.0** - February 17, 2024:
* Use nicer RegEx and more robust matching for resources (mostly inspired by how
  the Redirector plugin works).
* Add support for some of the book subscriptions, e.g. `IEEEeBooksNOW_AnelisPlus`.

**Version 0.3.0** - November 18, 2023:
* Remove useless options.

**Version 0.2.0** - November 13, 2023:
* Fixed many redirection issues and simplified the plugin.
* Added a list of all ANELIS member universities.

**Version 0.1.0** - November 10, 2023:
* Initial version on GitHub.
* Simple redirect button.
