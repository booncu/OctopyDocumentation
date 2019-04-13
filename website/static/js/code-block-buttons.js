// Turn off ESLint for this file because it's sent down to users as-is.
/* eslint-disable */
window.addEventListener('load', function() {
  function button(label, ariaLabel, icon, className) {
    const btn = document.createElement('button');
    btn.classList.add('btnIcon', className);
    btn.setAttribute('type', 'button');
    btn.setAttribute('aria-label', ariaLabel);
    btn.innerHTML =
      '<div class="btnIcon__body">' +
      icon +
      '<strong class="btnIcon__label">' +
      label +
      '</strong>' +
      '</div>';
    return btn;
  }

  function addButtons(codeBlockSelector, btn) {
    document.querySelectorAll(codeBlockSelector).forEach(function(code) {
      code.parentNode.appendChild(btn.cloneNode(true));
    });
  }

  const copyIcon = '<img width="12" height="12" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFbSURBVDhPY4CBsEnnXCKnng8In3Y+NGTy2Xa/nlP1bu0n0kA0iA8SB8tPOesM1QIB3i3HpHv2vPi8/OL3/7NPfPxfu/X1/9zlDz4ETjjnmrf84QcQHyQOkgepc+k8IgXVysDg0nFYbtaxD1+23fn3f8ON3//L1j7+X7buyd+Uhbd+la1/8hfEB4mD5EHqQOqhWlE1E8K01bzkzMf/sw+/+L/r5pf/C4+/+r/16qf/K868/b/uwof/i4+9+jV99/1FTetvNWPVvODYq/+EwMJDD09i1bz75leoEtzgwoMPW7FqXnziDVQJbrDi+NNjWDVvu/YZqgQ3OH773U6smleeeQdVghtsOvf8IFbNGy5+hCrBDfZcfrWXcs329ftZ0hdc789ZfGsmCPdsvX8BqgYngDsbHbRuvp6/+sTT3deeflqx4fTznWfvf1i94+LLrYeuv9kAwiB237bb8wGxN5Le5GSFPQAAAABJRU5ErkJggg==">';
  addButtons(
    '.hljs',
    button('Copy', 'Copy code to clipboard', copyIcon, 'btnClipboard'),
  );

  const clipboard = new ClipboardJS('.btnClipboard', {
    target: function(trigger) {
      return trigger.parentNode.querySelector('code');
    },
  });

  clipboard.on('success', function(event) {
    event.clearSelection();
    const textEl = event.trigger.querySelector('.btnIcon__label');
    textEl.textContent = ' Copied';
    setTimeout(function() {
      textEl.textContent = ' Copy';
    }, 2000);
  });
});