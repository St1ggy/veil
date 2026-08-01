.PHONY: validate index graph timeline books-wiki pdf site api all clean

PYTHON ?= .venv/bin/python3

validate: books-wiki
	$(PYTHON) scripts/validate/schema.py
	$(PYTHON) scripts/validate/ids.py
	$(PYTHON) scripts/validate/links.py
	$(PYTHON) scripts/validate/canon_status.py
	$(PYTHON) scripts/validate/contradictions.py
	$(PYTHON) scripts/validate/game_schema.py

books-wiki:
	$(PYTHON) scripts/generate/sync_wiki_from_raw_books.py

index: books-wiki
	$(PYTHON) scripts/generate/indexes.py
	$(PYTHON) scripts/generate/graph.py
	$(PYTHON) scripts/generate/timeline.py
	$(PYTHON) scripts/generate/toc.py

graph: index

timeline: index

pdf:
	bash scripts/build_pdf.sh

site:
	cd web && npm ci && npm run build

api:
	$(PYTHON) scripts/generate/json_api.py

all: validate index pdf site api

clean:
	rm -f out/*.pdf
	rm -rf site/*
	rm -rf api/*
	rm -rf graphs/*
	rm -f data/_index/*.json
	mkdir -p site api graphs data/_index
	touch api/.gitkeep graphs/.gitkeep data/_index/.gitkeep
