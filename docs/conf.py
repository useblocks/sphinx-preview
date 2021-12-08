# Configuration file for the Sphinx documentation builder.
#
# This file only contains a selection of the most common options. For a full
# list see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

# -- Path setup --------------------------------------------------------------

# If extensions (or modules to document with autodoc) are in another directory,
# add these directories to sys.path here. If the directory is relative to the
# documentation root, use os.path.abspath to make it absolute, like shown here.
#
# import os
# import sys
# sys.path.insert(0, os.path.abspath('.'))


# -- Project information -----------------------------------------------------

project = 'Sphinx-Preview'
copyright = '2021, team useblocks'
author = 'team useblocks'


# -- General configuration ---------------------------------------------------

# Add any Sphinx extension module names here, as strings. They can be
# extensions coming with Sphinx (named 'sphinx.ext.*') or your custom
# ones.
extensions = [
    'sphinx_preview',
    'sphinxcontrib.needs'
]

preview_config = {
    "selector": "div.body a",
    "not_selector": "div.needs_head a, h1 a, h2 a, h3 a, h4 a",
    # "selector": "div.body a.reference.internal",
    "set_icon": True,
    "icon_only": True,
    "icon_click": False,
    "width": 500,
    "height": 400,
    "offset": {
        "left": 30,
        "top": 30
    },
    "icon": "  👁",
    "timeout": 100,
}

# Add any paths that contain templates here, relative to this directory.
templates_path = ['_templates']

# List of patterns, relative to source directory, that match files and
# directories to ignore when looking for source files.
# This pattern also affects html_static_path and html_extra_path.
exclude_patterns = ['_build', 'Thumbs.db', '.DS_Store']


# -- Options for HTML output -------------------------------------------------

# The theme to use for HTML and HTML Help pages.  See the documentation for
# a list of builtin themes.
#
html_theme = 'alabaster'

# Add any paths that contain custom static files (such as style sheets) here,
# relative to this directory. They are copied after the builtin static files,
# so a file named "default.css" will overwrite the builtin "default.css".
html_static_path = ['_static']

html_theme_options = {
    'logo': 'sphinx-preview-logo.png',
    'logo_name': False,
    # 'description': "an extension for sphinx",
    'logo_text_align': "center",
    'github_user': 'useblocks',
    'github_repo': 'sphinx-preview',
    'github_banner': True,
    'github_button': True,
    'github_type': 'star',
    'fixed_sidebar': True,
    'extra_nav_links': {'PyPi': "https://pypi.python.org/pypi/sphinx-preview",
                        'github': "https://github.com/useblocks/sphinx-preview",
                        }
}

html_sidebars = {
    '**': [
        'about.html',
        'navigation.html',  # Reactivate if subpages get added
        'relations.html',
        'searchbox.html',
    ]
}
