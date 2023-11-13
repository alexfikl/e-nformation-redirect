all: help

help: 			## Show this help
	@echo -e "Specify a command. The choices are:\n"
	@grep -E '^[0-9a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[0;36m%-12s\033[m %s\n", $$1, $$2}'
	@echo ""
.PHONY: help

format: prettier	## Run formatting scripts
.PHONY: format

prettier:			## Run prettier to format javascript
	prettier \
		--tab-width 4 \
		--print-width 88 \
		-w *.js *.json *.html

black:			## Run black to format python
	python -m black \
		--safe --preview \
		--line-length 88 \
		--target-version py311 \
		*.py
