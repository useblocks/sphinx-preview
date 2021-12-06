.. Sphinx-Preview documentation master file, created by
   sphinx-quickstart on Mon Dec  6 11:07:59 2021.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

.. _sphinx_preview:

Sphinx-Preview
==============
``Sphinx-Preview`` shows small previews for selectable links in HTML documents.

Example:

* ``Sphinx-Preview`` is a `Sphinx <https://www.sphinx-doc.org>`_ extension.
* It is maintained by `danwos <https://daniel-woste.de>`_
* And it may be helpful to get quick previews, e.g. of
  `Sphinx-Needs <https://sphinxcontrib-needs.readthedocs.io/en/latest/>`_ objects

  * :need:`REQ_001`.
  * :need:`SPEC_001`.

``Sphinx-Preview`` does not provide any rst directives or roles, as it detects automatically all links via
JavaScript.

But there is a bunch of configuration options to control behavior and style.

Configuration
-------------
``Sphinx-Preview`` provides a single configuration option, called ``preview_config``.
This must get a Python dictionary:

.. code-block:: python

   # conf.py

   preview_config = {
       "selector": "div.body a",
       "not_selector": "div.needs_head a, h1 a, h2 a",
       "set_icon": True,
       "icon_only": True,
       "icon": "  👁",
       "width": 500,
       "height": 400,
       "offset": {
           "left": 20,
           "top": 20
       },
       "timeout": 500,
   }

selector / not_selector
~~~~~~~~~~~~~~~~~~~~~~~
Takes a `jQuery selector <https://learn.jquery.com/using-jquery-core/selecting-elements/>`_ to define which
links shall be taken into account.

``selector`` cares about all found elements. And ``not_selector`` defines, which links shall not be handled.

The internal javascript call looks like this:

.. code-block:: javascript

   $(config.selector).not(config.not_selector).each(function () {
     // some internal voodoo
   })

So ``selector`` can be used to select all links inside the main container, e.g. ``div.body``, and
``not_selector`` may be used to remove all links inside ``h1`` or ``h2``.

Default values:

:selector: ``div.body a``
:not_selector: ``h1 a, h2 a, h3 a, h4 a, h5 a, div.needs_head a``

Examples
++++++++

| **Alabaster - preview for internal links only**
| selector: ``div.body a.reference.internal``


.. toctree::
   :maxdepth: 2
   :hidden:

   examples/needs
   changelog

set_icon
~~~~~~~~
If ``set_icon`` is ``True``, an icon will be added at the end of the link.

Default: ``True``

icon_only
~~~~~~~~~
If ``True``, only the icon will open the preview.
The link itself stays "normal" and will not open a preview window.

Default: ``True``

icon
~~~~
Defines the icon or better a string.

Use Utf-8 icons to get some nice "images".

Default: ``👁``

width
~~~~~
Width of the preview window in `px`.

Default: ``500``

height
~~~~~~
Height of the preview window in `px`.

Default: ``300``

offset
~~~~~~
Takes a dictionary with the keys ``left`` and ``top``.
Both values define in ``px`` the location of the preview window, relative to the starting position of the link.

Default::

   {
       'left': 20,
       'top': 20
   }


timeout
~~~~~~~
A time in ``ms``, after which the preview window gets shown.

Default: ``250``.

