PYTHON := 'python -X dev'

_default:
    @just --list

[doc("Run formatting scripts")]
format: prettier

[doc("Run prettier to format javascript")]
prettier:
    prettier \
        --tab-width 4 \
        --print-width 88 \
        -w *.js *.json data/*.json

[doc("Create the Firefox extension")]
xpi:
    zip -r e-nformation-redirect.xpi background.js manifest.json

[doc("Update license text")]
license:
    python -m reuse download GPL-3.0-or-later
    cp LICENSES/GPL-3.0-or-later.txt LICENSE
    @rm -rf LICENSES

[doc("Remove all generated files")]
purge:
    rm -rf *.xpi

