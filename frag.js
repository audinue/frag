new MutationObserver(function (mutations) {
  mutations
    .flatMap(function (mutation) {
      return Array.from(mutation.addedNodes)
    })
    .filter(function (node) {
      return node.nodeType === Node.ELEMENT_NODE
    })
    .flatMap(function (element) {
      return (element.matches('[frag-content]') ? [element] : []).concat(
        Array.from(element.querySelectorAll('[frag-content]'))
      )
    })
    .filter(function (element, index, array) {
      return array.indexOf(element) === index
    })
    .forEach(function (container) {
      var template = document.querySelector(container.getAttribute('frag-content'))
      if (template && template.content.firstElementChild) {
        container.appendChild(template.content.firstElementChild.cloneNode(true))
      }
    })
}).observe(document, {
  childList: true,
  subtree: true
})
addEventListener('click', function (e) {
  if (e.target.closest) {
    var element = e.target.closest('[frag-target]')
    if (element) {
      var target = document.querySelector(element.getAttribute('frag-target'))
      if (target) {
        var select = element.getAttribute('frag-select')
        if (select 
            && (select = document.querySelector(select))
            && select.content.firstElementChild) {
          while (target.firstChild) {
            target.removeChild(target.firstChild)
          }
          target.appendChild(select.content.firstElementChild.cloneNode(true))
        } else if ((push = element.getAttribute('frag-push'))
            && (push = document.querySelector(push))
            && push.content.firstElementChild) {
          target.appendChild(push.content.firstElementChild.cloneNode(true))
        }
      }
    } else if (element = e.target.closest('[frag-pop]')) {
      var pop = document.querySelector(element.getAttribute('frag-pop'))
      if (pop && pop.lastElementChild !== pop.firstElementChild) {
        pop.removeChild(pop.lastElementChild)
      }
    }
  }
})
