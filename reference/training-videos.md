---
layout: default
title: Training Videos
permalink: /reference/training-videos.html
parent: Reference
nav_order: 6
corpus_exclude: true
---

# Training Videos

Complete index of engineering training recordings. Each video links to its SharePoint page and the wiki pages that reference it.

{% if site.data['training-videos'].index %}
> **SharePoint library**: [All Training Videos]({{ site.data['training-videos'].index }})
{% endif %}

---

{% assign videos = site.data['training-videos'].videos %}

| # | Video | Wiki Pages | Notes |
|---|-------|------------|-------|
{% for v in videos %}{% assign key = v[0] %}{% assign info = v[1] %}| {{ forloop.index }} | {% if info.url and info.url != "" %}[{{ info.title }}]({{ info.url }}){% else %}{{ info.title }} *(pending)*{% endif %} | {{ info.files }} | {{ info.note | default: "" }} |
{% endfor %}

---

**{{ videos | size }} recordings** indexed. Videos marked *(pending)* are awaiting upload.

To add a new video, update `_data/training-videos.yml` and add a corresponding `[^transcript-KEY]` footnote in the relevant wiki page(s).
