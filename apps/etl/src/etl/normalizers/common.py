def pick(d, *keys):
    return {k: d.get(k) for k in keys if k in d}
