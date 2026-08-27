/** @param {import('hast').Root} tree */
export function rehypeLazyImages() {
  return (tree) => {
    walk(tree)
  }
}

/** @param {import('hast').Root | import('hast').Element} node */
function walk(node) {
  if (node.type === 'element' && node.tagName === 'img') {
    node.properties = node.properties ?? {}
    node.properties.loading = 'lazy'
    node.properties.decoding = 'async'
  }

  if ('children' in node && Array.isArray(node.children)) {
    for (const child of node.children) {
      if (child.type === 'element') walk(child)
    }
  }
}
