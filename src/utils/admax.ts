export type AdInjectionStatus = 'success' | 'error';

export const injectAdIntoContainer = (
  container: HTMLElement,
  scriptUrl: string,
  onFinish?: (status: AdInjectionStatus) => void
) => {
  container.innerHTML = '';

  const originalWrite = document.write.bind(document);
  const originalWriteln = document.writeln.bind(document);
  const originalOpen = document.open.bind(document);
  const originalClose = document.close.bind(document);

  const appendHtml = (html: string) => {
    if (!html) return;

    const template = document.createElement('template');
    template.innerHTML = html;

    for (const node of Array.from(template.content.childNodes)) {
      if (node.nodeName === 'SCRIPT') {
        const scriptNode = node as HTMLScriptElement;
        const scriptEl = document.createElement('script');
        for (const attr of Array.from(scriptNode.attributes)) {
          scriptEl.setAttribute(attr.name, attr.value);
        }
        scriptEl.text = scriptNode.text;
        container.appendChild(scriptEl);
      } else {
        container.appendChild(node);
      }
    }
  };

  document.write = (...html: string[]) => appendHtml(html.join(''));
  document.writeln = (...html: string[]) => appendHtml(`${html.join('')}\n`);
  document.open = ((..._args: Parameters<typeof document.open>) => {
    container.innerHTML = '';
    return document;
  }) as typeof document.open;
  document.close = () => {
    /* noop */
  };

  const restore = () => {
    document.write = originalWrite;
    document.writeln = originalWriteln;
    document.open = originalOpen;
    document.close = originalClose;
  };

  const handleFinish = (status: AdInjectionStatus) => {
    restore();
    onFinish?.(status);
  };

  const script = document.createElement('script');
  script.src = scriptUrl;
  script.async = false;
  script.onload = () => handleFinish('success');
  script.onerror = () => handleFinish('error');

  container.appendChild(script);

  return restore;
};
