Needs Examples
==============

Requirements and Specifications for :ref:`sphinx_preview`.

Requirements
------------

.. req:: Show preview window
   :id: REQ_001
   :status: done

   Show a preview window, which shall contain the linked page.

   This is for :ref:`sphinx_preview`.


Specifications
--------------

.. spec:: iframe in div container
   :id: SPEC_001
   :status: done

   Use an ``iframe`` in a ``div`` container, which loads the page for us.

   .. hint:: site-loads via iframe does not work, if the target website has prohibited it.


