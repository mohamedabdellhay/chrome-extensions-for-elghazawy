(function () {
  ("use strict");

  // create SEO panel
  function createSEOPanel() {
    const panel = document.createElement("div");
    panel.id = "seo-checker-panel";
    panel.innerHTML = `
            <div class="seo-header">
                <h3>📊 SEO Checker</h3>
                <button id="seo-toggle" class="toggle-btn">−</button>
            </div>
            <div class="seo-content">
                <div id="seo-results"></div>
                <button id="refresh-seo" class="refresh-btn">🔄 Refresh Analysis</button>
            </div>
        `;

    document.body.appendChild(panel);

    // extension event listeners
    document
      .getElementById("seo-toggle")
      .addEventListener("click", togglePanel);
    document
      .getElementById("refresh-seo")
      .addEventListener("click", runSEOAnalysis);

    // start SEO analysis
    runSEOAnalysis();
  }

  function togglePanel() {
    const content = document.querySelector(".seo-content");
    const toggle = document.getElementById("seo-toggle");

    if (content.style.display === "none") {
      content.style.display = "block";
      toggle.textContent = "−";
    } else {
      content.style.display = "none";
      toggle.textContent = "+";
    }
  }

  function runSEOAnalysis() {
    const results = analyzeSEO();
    displayResults(results);
  }

  function analyzeSEO() {
    const { allFilled, noneCompleted } = checkAllInputs();
    const analysis = {
      title: analyzeTitle(),
      meta: analyzeMeta(),
      headings: analyzeHeadings(),
      images: analyzeImages(),
      links: analyzeLinks(),
      content: analyzeContent(),
      performance: analyzePerformance(),
      allInputsFilled: allFilled,
      noneInputsCompleted: noneCompleted,
    };
    console.log("SEO Analysis Results:", analysis);
    return analysis;
  }

  function analyzeTitle() {
    const titleElement = document.querySelector("input[name='name_ar']");
    const title = titleElement ? titleElement.value : "";
    console.log(titleElement, title);
    return {
      exists: !!titleElement,
      length: title.length,
      text: title,
      optimal: title.length >= 30 && title.length <= 60,
      issues: getIssues("title", title),
    };
  }

  function analyzeMeta() {
    const description = document.querySelector(
      'div[class="note-editable panel-body"]'
    );
    const keywords = document.querySelector('meta[name="keywords"]');
    const viewport = document.querySelector('meta[name="viewport"]');
    const robots = document.querySelector('meta[name="robots"]');

    const descText = description ? description.innerHTML : "";
    // console.log(description, descText);
    return {
      description: {
        exists: !!description,
        length: descText.length,
        text: descText,
        optimal: descText.length >= 120 && descText.length <= 160,
      },
      keywords: {
        exists: !!keywords,
        content: keywords ? keywords.getAttribute("content") : "",
      },
      viewport: {
        exists: !!viewport,
        content: viewport ? viewport.getAttribute("content") : "",
      },
      robots: {
        exists: !!robots,
        content: robots ? robots.getAttribute("content") : "",
      },
    };
  }

  function analyzeHeadings() {
    const h1s = document.querySelectorAll("h1");
    const h2s = document.querySelectorAll("h2");
    const h3s = document.querySelectorAll("h3");
    const allHeadings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");

    return {
      h1Count: h1s.length,
      h1Text: h1s.length > 0 ? h1s[0].textContent : "",
      h2Count: h2s.length,
      h3Count: h3s.length,
      totalHeadings: allHeadings.length,
      structure: analyzeHeadingStructure(allHeadings),
      optimal: h1s.length === 1,
    };
  }

  function analyzeHeadingStructure(headings) {
    const structure = [];
    headings.forEach((heading) => {
      structure.push({
        tag: heading.tagName.toLowerCase(),
        text: heading.textContent.trim().substring(0, 50) + "...",
        length: heading.textContent.length,
      });
    });
    return structure;
  }

  function analyzeImages() {
    const mainImageInput = document.querySelector("input[name='main_image']");
    const otherImagesInput = document.querySelector("input[name='images[]']");
    const productImages = document.querySelectorAll(".image-item img");

    mainImageInput.addEventListener("change", function () {
      const file = mainImageInput.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          const img = new Image();
          img.src = e.target.result;
          img.onload = function () {
            const width = img.width;
            const height = img.height;
            const size = file.size / 1024; // size in KB
            const imageFormat = file.type.split("/")[1];
            console.log(
              `Image Width: ${width}px, Height: ${height}px, Size: ${size}KB, Format: ${imageFormat}`
            );
          };
        };
        reader.readAsDataURL(file);
      }
    });
    otherImagesInput.addEventListener("change", function () {
      const files = otherImagesInput.files;
      if (files.length > 0) {
        Array.from(files).forEach((file) => {
          const reader = new FileReader();
          reader.onload = function (e) {
            const img = new Image();
            img.src = e.target.result;

            img.onload = function () {
              const width = img.width;
              const height = img.height;
              const size = file.size / 1024; // size in KB
              const imageFormat = file.type.split("/")[1];
              console.log(
                `Image Width: ${width}px, Height: ${height}px, Size: ${size}KB, Format: ${imageFormat}`
              );
            };
          };
          reader.readAsDataURL(file);
        });
      }
    });

    let withoutAlt = 0;
    let withEmptyAlt = 0;
    let totalSize = 0;

    const imagesData = [];

    return {
      total: 1,
      withoutAlt: withoutAlt,
      withEmptyAlt: withEmptyAlt,
      withValidAlt: 1 - withoutAlt - withEmptyAlt,
      altOptimal: withoutAlt === 0 && withEmptyAlt === 0,
    };
  }

  function analyzeLinks() {
    const links = document.querySelectorAll("a");
    let internal = 0;
    let external = 0;
    let withoutTitle = 0;
    let nofollow = 0;

    const currentDomain = window.location.hostname;

    links.forEach((link) => {
      const href = link.getAttribute("href");
      if (href) {
        if (href.startsWith("http") && !href.includes(currentDomain)) {
          external++;
        } else if (href.startsWith("/") || href.includes(currentDomain)) {
          internal++;
        }

        if (!link.hasAttribute("title")) {
          withoutTitle++;
        }

        if (
          link.getAttribute("rel") &&
          link.getAttribute("rel").includes("nofollow")
        ) {
          nofollow++;
        }
      }
    });

    return {
      total: links.length,
      internal: internal,
      external: external,
      withoutTitle: withoutTitle,
      nofollow: nofollow,
    };
  }

  function analyzeContent() {
    const bodyText = document.body.textContent || "";
    const words = bodyText
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0);
    const sentences = bodyText
      .split(/[.!?]+/)
      .filter((s) => s.trim().length > 0);

    return {
      wordCount: words.length,
      sentenceCount: sentences.length,
      avgWordsPerSentence:
        sentences.length > 0 ? Math.round(words.length / sentences.length) : 0,
      readabilityOptimal: words.length >= 300 && words.length <= 2000,
    };
  }

  function analyzePerformance() {
    const scripts = document.querySelectorAll("script");
    const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
    const inlineStyles = document.querySelectorAll("style");

    return {
      scriptCount: scripts.length,
      stylesheetCount: stylesheets.length,
      inlineStyleCount: inlineStyles.length,
      domElements: document.querySelectorAll("*").length,
    };
  }

  function getIssues(type, content) {
    const issues = [];

    if (type === "title") {
      if (content.length === 0) issues.push("العنوان مفقود");
      else if (content.length < 30) issues.push("العنوان قصير جداً");
      else if (content.length > 60) issues.push("العنوان طويل جداً");
    }

    return issues;
  }

  function displayResults(results) {
    const container = document.getElementById("seo-results");

    let html = `
            <div class="seo-section">
                <h4>📝 العنوان (Title)</h4>
                <div class="seo-item ${
                  results.title.optimal ? "good" : "warning"
                }">
                    <span class="status">${
                      results.title.optimal ? "✅" : "⚠️"
                    }</span>
                    <span>الطول: ${results.title.length} حرف</span>
                </div>
                ${
                  results.title.text
                    ? `<div class="seo-detail">"${results.title.text}"</div>`
                    : ""
                }
                ${
                  results.title.issues.length > 0
                    ? `<div class="seo-issues">${results.title.issues.join(
                        ", "
                      )}</div>`
                    : ""
                }
            </div>

            <div class="seo-section">
                <h4>🏷️ Meta Description</h4>
                <div class="seo-item ${
                  results.meta.description.optimal ? "good" : "warning"
                }">
                    <span class="status">${
                      results.meta.description.exists
                        ? results.meta.description.optimal
                          ? "✅"
                          : "⚠️"
                        : "❌"
                    }</span>
                    <span>الطول: ${results.meta.description.length} حرف</span>
                </div>
                ${
                  results.meta.description.text
                    ? `<div class="seo-detail">"${results.meta.description.text}"</div>`
                    : ""
                }
            </div>

            <div class="seo-section">
                <h4>📋 العناوين (Headings)</h4>
                <div class="seo-item ${
                  results.headings.optimal ? "good" : "warning"
                }">
                    <span class="status">${
                      results.headings.optimal ? "✅" : "⚠️"
                    }</span>
                    <span>H1: ${results.headings.h1Count}, H2: ${
      results.headings.h2Count
    }, H3: ${results.headings.h3Count}</span>
                </div>
                ${
                  results.headings.h1Text
                    ? `<div class="seo-detail">H1: "${results.headings.h1Text}"</div>`
                    : ""
                }
            </div>

            <div class="seo-section">
                <h4>🖼️ الصور (Images)</h4>
                <div class="seo-item ${
                  results.images.altOptimal ? "good" : "warning"
                }">
                    <span class="status">${
                      results.images.altOptimal ? "✅" : "⚠️"
                    }</span>
                    <span>المجموع: ${results.images.total}, بدون Alt: ${
      results.images.withoutAlt
    }</span>
                </div>
            </div>

            <div class="seo-section">
                <h4>🔗 الروابط (Links)</h4>
                <div class="seo-item good">
                    <span class="status">ℹ️</span>
                    <span>داخلية: ${results.links.internal}, خارجية: ${
      results.links.external
    }</span>
                </div>
            </div>

            <div class="seo-section">
                <h4>📊 المحتوى (Content)</h4>
                <div class="seo-item ${
                  results.content.readabilityOptimal ? "good" : "warning"
                }">
                    <span class="status">${
                      results.content.readabilityOptimal ? "✅" : "⚠️"
                    }</span>
                    <span>الكلمات: ${results.content.wordCount}</span>
                </div>
            </div>

            <div class="seo-section">
                <h4>⚡ الأداء (Performance)</h4>
                <div class="seo-item info">
                    <span class="status">ℹ️</span>
                    <span>Scripts: ${results.performance.scriptCount}, CSS: ${
      results.performance.stylesheetCount
    }</span>
                </div>
            </div>
        `;

    container.innerHTML = html;
  }

  function checkAllInputs() {
    const itemFormGroup = document.querySelector(".form-body>div>div");
    console.log("itemFormGroup", itemFormGroup);

    const inputs = itemFormGroup.querySelectorAll("input, textarea, select");
    console.log("inputs", inputs);
    let allFilled = true;
    inputs.forEach((input) => {
      if (!input.value.trim()) {
        allFilled = false;
        input.classList.add("error");
      } else {
        input.classList.remove("error");
      }
    });
    const noneCompleted = Array.from(inputs).filter(
      (input) => !input.value.trim()
    );
    console.log("filled not completed", noneCompleted);
    return { allFilled, noneCompleted };
  }

  // start the script when the document is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", createSEOPanel);
  } else {
    createSEOPanel();
  }
})();

/*






















*/

//  old code
// async function getImageSize(url) {
//   try {
//     // First try with a HEAD request
//     const headResponse = await fetch(url, {
//       method: "HEAD",
//       credentials: "include",
//     });

//     if (headResponse.ok) {
//       const contentLength = headResponse.headers.get("Content-Length");
//       if (contentLength) return parseInt(contentLength);
//     }

//     // If HEAD fails or no Content-Length, try with GET
//     const getResponse = await fetch(url, {
//       credentials: "include",
//     });
//     const blob = await getResponse.blob();
//     return blob.size;
//   } catch (e) {
//     console.error(`Failed to get size for ${url}:`, e);
//     return null;
//   }
// }

// async function processImages(productImages) {
//   const imagesData = [];
//   let withoutAlt = 0;
//   let withEmptyAlt = 0;

//   for (const img of Array.from(productImages)) {
//     const src = img.getAttribute("src");
//     if (!src) continue;

//     const width = img.naturalWidth;
//     const height = img.naturalHeight;
//     const alt = img.getAttribute("alt") || "";
//     let size = null;

//     // Handle base64 images
//     if (src.startsWith("data:")) {
//       const base64Prefix = src.substring(0, src.indexOf(",") + 1);
//       size = Math.round((src.length - base64Prefix.length) * 0.75);
//     }
//     // For other images, get the size
//     else if (width > 0 && height > 0) {
//       size = await getImageSize(src);
//     }

//     imagesData.push({
//       url: src,
//       width,
//       height,
//       alt,
//       size,
//     });

//     if (!alt) {
//       withoutAlt++;
//     } else if (alt.trim() === "") {
//       withEmptyAlt++;
//     }
//   }

//   console.log("Images data:", imagesData);
//   console.log(`Images without alt: ${withoutAlt}`);
//   console.log(`Images with empty alt: ${withEmptyAlt}`);

//   return {
//     imagesData,
//     withoutAltCount: withoutAlt,
//     withEmptyAltCount: withEmptyAlt,
//   };
// }

// Usage example:
