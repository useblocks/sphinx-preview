import jinja2
import json
import os
import platform

from sphinx.util.osutil import copyfile

from sphinx_preview.version import VERSION


def setup(app):
    app.add_config_value('preview_config', {}, 'html')
    app.connect("env-updated", install_lib_static_files)

    return {
        "version": VERSION,
        "parallel_read_safe": True,
        "parallel_write_safe": True,
    }


def _save_js_file(app, target):
    config = app.config.preview_config

    final_config = {
        "selector": config.get('selector', 'div.body a'),
        "not_selector": config.get('not_selector', 'h1 a, h2 a, h3 a, h4 a, h5 a, div.needs_head a'),
        "icon": config.get('icon', '  👁'),
        "set_icon": config.get('set_icon', True),
        "icon_only": config.get('icon_only', True),
        "icon_click": config.get('icon_click', True),
        "width": config.get('width', 500),
        "height": config.get('height', 300),
        "offset": config.get('offset', {'left': 20, 'top': 20}),
        "timeout": config.get('timeout', 250)
    }
    script_dir = os.path.join(os.path.dirname(__file__), 'assets')
    templateLoader = jinja2.FileSystemLoader(searchpath=script_dir)
    templateEnv = jinja2.Environment(loader=templateLoader)
    TEMPLATE_FILE = "template_sphinx_preview.js"
    try:
        template = templateEnv.get_template(TEMPLATE_FILE)
        outputText = template.render(config=json.dumps(final_config))
    except Exception as e:
        raise e
    os.makedirs(os.path.dirname(target), exist_ok=True)
    with open(target, 'w+') as conf_file:
        conf_file.write(outputText)

    return final_config


def install_lib_static_files(app, env):
    # Add js / css files to the final project
    extra_files = ['assets/sphinx_preview.css']
    register_files = ['assets/sphinx_preview.js', 'assets/sphinx_preview.css']
    this_path = os.path.abspath(os.path.dirname(__file__))

    static_path = os.path.join(app.builder.outdir, '_static')
    try:
        os.mkdir(static_path)
    except FileExistsError:
        pass

    dest_path = os.path.join(static_path, 'assets/sphinx_preview.js')
    _save_js_file(app, dest_path)

    for extra_file in extra_files:
        # Change os specific folder separator
        if platform.system() == "Windows":
            extra_file.replace('/', '\\')

        extra_path = os.path.join(this_path, extra_file)
        extra_dir = os.path.dirname(extra_path).replace(this_path, '')
        if extra_dir.startswith(os.path.sep):
            extra_dir = extra_dir[1:]
        if not os.path.exists(extra_path):
            raise FileNotFoundError(f'Not found: {extra_path}')

        static_file_dir = os.path.join(static_path, extra_dir)
        try:
            os.mkdir(static_file_dir)
        except FileExistsError:
            pass

        dest_path = os.path.join(static_path, extra_file)
        copyfile(extra_path, dest_path)

    for register_file in register_files:
        builder_static_path = os.path.join(app.builder.outdir, '_static')
        dest_path = os.path.join(static_path, register_file)
        web_path = dest_path.replace(builder_static_path, '')
        if web_path.startswith(os.path.sep):
            web_path = web_path[1:]
        if register_file.endswith('js'):
            app.add_js_file(str(web_path))
        elif register_file.endswith('css'):
            app.add_css_file(str(web_path))
