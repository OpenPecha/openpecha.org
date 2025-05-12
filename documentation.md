# Documentation

Welcome to the OpenPecha documentation. Here you'll find comprehensive guides and reference materials to help you work with our tools and resources.

## Getting Started

If you're new to OpenPecha, we recommend starting with these resources:

- [What is OpenPecha?](#what-is-openpecha)
- [Core Concepts](#core-concepts)
- [Installation Guide](#installation-guide)
- [Quick Start Tutorial](#quick-start-tutorial)

## What is OpenPecha?

OpenPecha is a freely available platform for storing and managing etexts and annotations. It's accessible through GitHub and a suite of APIs, allowing for easy integration with other tools.

Our core mission is to streamline the process of collecting, proofreading, and enriching etexts and annotations. We achieve this by combining the power of language technology with collaborative workflows.

## Core Concepts

### The OPF Format

The OpenPecha Format (OPF) is a data model designed for storing and managing Buddhist texts and their annotations. Key features include:

- **Base Text**: The core text content without annotations
- **Layers**: Separate annotation layers for different types of information
- **Metadata**: Comprehensive information about the text source and content
- **Version Control**: Built on Git for tracking changes and collaboration

[Learn more about OPF Format](old-site/docs/data/opf-format.md)

### Layers

Layers in OpenPecha are separate files that contain specific types of annotations that can be applied to the base text. Common layer types include:

- **Text**: Character-level annotations like spelling corrections
- **Pagination**: Page and volume boundaries
- **Structure**: Chapters, sections, and other structural elements
- **Alignment**: Cross-references between texts or translations

[Learn more about Layers](old-site/docs/toolkit/layer.md)

## Installation Guide

### Requirements

- Python 3.7 or higher
- Git

### Installation

```bash
pip install openpecha
```

For development installation:

```bash
git clone https://github.com/OpenPecha/OpenPecha.git
cd OpenPecha
pip install -e .
```

[Detailed Installation Guide](old-site/docs/toolkit/install.md)

## Quick Start Tutorial

### Creating a New Pecha

```python
from openpecha.core.pecha import OpenPechaFS
from openpecha.core.metadata import InitialPechaMetadata

# Create metadata
metadata = InitialPechaMetadata(
    source="https://example.com/text.txt",
    title="Example Text"
)

# Create a new pecha
pecha = OpenPechaFS(metadata=metadata)

# Add base text
pecha.base = "This is the base text content."

# Save the pecha
pecha_id = pecha.save()
print(f"Created pecha: {pecha_id}")
```

### Working with Layers

```python
from openpecha.core.layer import Layer, LayerEnum
from openpecha.core.annotation import Span, AnnBase

# Create a text annotation
text_ann = AnnBase(
    span=Span(start=0, end=4),
    metadata={"correction": "That"}
)

# Create a text layer
text_layer = Layer(annotation_type=LayerEnum.text)
text_layer.set_annotation(annotation_id="text_ann_01", annotation=text_ann)

# Add the layer to the pecha
pecha.layers["text"] = text_layer

# Save the updated pecha
pecha.save()
```

## Advanced Topics

- [Acquisition Pipeline](old-site/docs/toolkit/acquisition-pipeline.md)
- [Publishing Pipeline](old-site/docs/toolkit/publishing-pipeline.md)
- [Working with HFML](old-site/docs/data/hfml.md)
- [API Reference](old-site/docs/api/reference.md)

## Additional Resources

- [GitHub Repository](https://github.com/OpenPecha/OpenPecha)
- [Issue Tracker](https://github.com/OpenPecha/OpenPecha/issues)
- [Community Forum](https://forum.openpecha.org/)
