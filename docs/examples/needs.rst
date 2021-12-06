.. _needs:

Needs Examples
==============

Requirements and Specifications for :ref:`sphinx_preview`.

Using `Sphinx-Needs <https://sphinxcontrib-needs.readthedocs.io/en/latest/>`_.

Requirements
------------

.. req:: Show preview window
   :id: REQ_001
   :status: done

   Show a preview window, which shall contain the linked page.

   This is for :ref:`sphinx_preview`, an extension for  `Sphinx <https://www.sphinx-doc.org>`_.


Specifications
--------------

.. spec:: iframe in div container
   :id: SPEC_001
   :status: done
   :links: REQ_001

   Use an ``iframe`` in a ``div`` container, which loads the page for us.

   .. hint:: site-loads via iframe does not work, if the target website has prohibited it.


