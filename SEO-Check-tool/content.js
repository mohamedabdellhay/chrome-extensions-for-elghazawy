/**
 * SEO Analyzer Browser Extension
 * @module SEOScript
 */
(function () {
  ("use strict");

  // Configuration
  const CONFIG = {
    INVALID_CATEGORIES: new Set([
      "Mobile, Tablet",
      "Mobile Accessories",
      "Earphones",
      "Wearable Devices",
      "Phones & Tablet",
      "Health & Beauty",
      "Skin Care",
      "Sun care",
      "Cleansers",
      "Skin Treatments",
      "Eye Treatments",
      "All Moisturiser",
      "Personal Care",
      "Small Caring tools",
      "Hair styling tools",
      "All Shavers & hair removals",
      "All Hair Removals",
      "Trimmer and Shavers",
      "Makeup",
      "Lips",
      "Eyes & Eyebrows",
      "Face",
      "Makeup Brushes ",
      "Nails",
      "Hair Care",
      "Hair Treatments",
      "Styling Products",
      "Shampoo & Conditioner products",
      "Hair Dyes",
      "Bath & Body Care",
      "Body Care",
      "Hands and Feet",
      "Mouth and Tooth",
      "Feminine care",
      "Baby Care",
      "Men Care",
      "Accessories",
      "Hand Watches",
      "All Fragrances",
      "Body Spray",
      "Body Splash(Mist)",
      "Perfumes",
      "Computing",
      "LapTop",
      "Networking",
      "Routers devices",
      "Data Storage",
      "Memory Cards",
      "Hard Drives",
      "Optical Discs",
      "Computer Units",
      "Cables and Adapters",
      "Splitters",
      "Cables",
      "Computer and Laptop Accessories",
      "PC and Laptop Accessories",
      "Keyboard and Mouse",
      "Home Appliances",
      "Big Home Appliances",
      "Washing Machines",
      "Built -in appliances",
      "Air Conditioners",
      "Refrigerators And Freezers",
      "Refrigerators",
      "Freezer",
      "Small Home Appliances",
      "Water Heaters",
      "Fans",
      "Iron",
      "Air Heater",
      "Ventilating Fan",
      "Water Filters",
      "Kitchen Appliances",
      "Breakfast Appliances",
      "Coffee and Espresso Machines",
      "Fryer",
      "Chopping & Cutting Appliances",
      "Mixing Appliances",
      "Specialized Appliances",
      "Televisions",
      "TVs",
      "Tv Sound System",
      "Tv supplies",
      "More",
      "Fitness Supplies",
      "Bikes",
      "Maintenance Tools",
      "Measuring tools",
      "Laser measuring Tools",
      "Safety and PPE",
      "Equipment Electrical",
      "Grinding",
      "Saws",
      "Pressure washers and accessories",
      "Drills and accessories",
      "Tools Accessories",
      "Cracking And Punching Bits",
      "Cutting And Sanding Disk",
      "Hand Maintenance Tools",
      "Hammer",
      "Pliers",
      "screwdrivers and Wrenches",
      "screwdrivers",
      "Wrenches",
      "Building Supplies",
      "Painting Tools",
      "mount tools",
      "Gardening tools",
      "Electricity ",
      "Batteries",
      "Bags",
      "Laptop Bag",
      "Fashion ",
      "Women",
      "Men",
      "Kids",
      "Toys ",
      "Variety Toys",
      "Sea Toys",
      "Baby Products",
      "Musical Toys",
      "Dolls and Moving Toys",
      "Action Toys",
      "Mind ",
      "Stationery",
      "Stationary Supplies",
      "Office Supplies",
      "Office Machines",
      "Stationery Supplies",
      "Staplers And Punchers ",
      "Board Supplies",
      "Board markers",
      "Tapes And Adhesives",
      "Paper Cutters",
      "Stamps and Supplies",
      "Calculators",
      "School Supplies",
      "Writing Supplies",
      "Pens",
      "Pencils",
      "Markers And Highlighters",
      "Pens and Refills",
      "Erasers and Correction Supplies",
      "Paper Products",
      "Geometry Tools",
      "School Geometry Tools ",
      "University Geometry Tools",
      "Drawing and Colours Supplies",
      "Colours",
      "Felt Pens Colors ",
      "Books",
      "Kitchen ",
      "Kitchen Tools",
      "Scale",
      "Cookware ",
      "Food Storage ",
      "Jars and Spice Set",
      "Knives, Forks, Spoons",
      "Drinkware",
      "Glasses Sets",
      "Cup Sets",
      "Coffee and Tea Equipment",
      "Heat Savers",
      "All Mugs",
      "All mugs and bottles",
      "Water Bottles",
      "Kitchen Accessories",
      "Kitchen Organisers",
      "Plastics",
      "Hand Tools And Devices",
      "Dinnerware",
      "Serving Trays",
      "Table Sets",
      "Serves Set",
      "Bakeware",
      "Home",
      "Lantern",
      "Flashlights",
      "Bulbs",
      "Antiques",
      "Bedding",
      "Towels",
      "Bed Scarves",
      "Furniture",
      "Home Care ",
      "Cleaning Supplies",
      "Household Cleaners",
      "Laundry Care",
      "House Tissues",
      "Pest Control",
      "Electronics",
      "Camera ",
      "Camera Accessories",
      "Batteries and chargers",
      "Printers And Scanners",
      "Printers",
      "Surveillance Systems",
      "Security",
      "Car Kits",
      "Audios",
      "Car Accessories",
      "Audio devices",
      "Microphones",
      "Speakers",
      "Landline Phones",
      "Video Gaming",
      "Video Gaming Accessories",
      "Projector",
    ]),
    DOM_SELECTORS: {
      category: ".select2-selection__choice",
      formContainer: ".item-form-group-body",
      titleInput: "input[name='name_ar']",
      descriptionEditor: 'div[class="note-editable panel-body"]',
      mainImageInput: "input[name='main_image']",
      otherImagesInput: "input[name='images[]']",
      productImages: ".image-item img",
      formBody: ".form-body>div>div",
    },
    SEO_RULES: {
      title: { minLength: 30, maxLength: 60 },
      metaDescription: { minLength: 120, maxLength: 160 },
      content: { minWords: 300, maxWords: 2000 },
      images: { maxSizeKB: 100, minWidth: 300, minHeight: 300 },
    },
  };

  // CSS Styles
  const STYLES = `
  :root {
    --primary-color: #007bff;
    --success-color: #28a745;
    --warning-color: #ffc107;
    --error-color: #dc3545;
    --text-color: #333;
    --background-color: #ffffff;
    --border-color: #ddd;
    --shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    --transition: all 0.3s ease;
  }

  /* Dark mode variables */
  [data-theme="dark"] {
    --primary-color: #66b0ff;
    --success-color: #4caf50;
    --warning-color: #ffb300;
    --error-color: #f44336;
    --text-color: #e0e0e0;
    --background-color: #1e2a44;
    --border-color: #3a4a6b;
    --shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }

  #seo-checker-panel {
    position: fixed;
    right: 20px;
    top: 20px;
    width: 320px;
    max-height: 80vh;
    background: var(--background-color);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    box-shadow: var(--shadow);
    z-index: 10000;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    color: var(--text-color);
    overflow-y: auto;
    transition: var(--transition);
  }

  .seo-header {
    padding: 12px 16px;
    background: var(--background-color);
    border-bottom: 1px solid var(--border-color);
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 1;
  }

  .seo-header h3 {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .seo-content {
    padding: 16px;
    transition: var(--transition);
  }

  .seo-section {
    margin-bottom: 16px;
  }

  .seo-section h4 {
    margin: 0 0 8px;
    font-size: 1rem;
    font-weight: 500;
    color: var(--text-color);
  }

  .seo-item {
    padding: 10px;
    border-radius: 8px;
    margin: 6px 0;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: var(--transition);
  }

  .seo-item.good {
    background: rgba(40, 167, 69, 0.1);
    border-left: 4px solid var(--success-color);
  }

  .seo-item.warning {
    background: rgba(255, 193, 7, 0.1);
    border-left: 4px solid var(--warning-color);
  }

  .seo-item.info {
    background: rgba(0, 123, 255, 0.1);
    border-left: 4px solid var(--primary-color);
  }

  .seo-item .status {
    font-size: 1.2rem;
  }

  .seo-detail {
    font-size: 0.85rem;
    color: color-mix(in srgb, var(--text-color) 70%, transparent);
    margin-top: 6px;
    word-break: break-word;
  }

  .seo-issues {
    font-size: 0.85rem;
    color: var(--error-color);
    margin-top: 6px;
  }

  .toggle-btn, .refresh-btn, .theme-toggle {
    cursor: pointer;
    padding: 6px 12px;
    border: none;
    border-radius: 6px;
    background: var(--primary-color);
    color: white;
    font-size: 0.9rem;
    transition: var(--transition);
  }

  .toggle-btn:hover, .refresh-btn:hover, .theme-toggle:hover {
    background: color-mix(in srgb, var(--primary-color) 80%, white);
    transform: translateY(-1px);
  }

  .toggle-btn:focus, .refresh-btn:focus, .theme-toggle:focus {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }

  .refresh-btn {
    display: block;
    width: 100%;
    margin-top: 12px;
  }

  .theme-toggle {
    margin-left: 8px;
    background: var(--background-color);
    color: var(--text-color);
    border: 1px solid var(--border-color);
  }

  .error {
    border: 2px solid var(--error-color) !important;
    animation: shake 0.3s;
  }

  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25%, 75% { transform: translateX(-3px); }
    50% { transform: translateX(3px); }
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    #seo-checker-panel {
      width: 90%;
      max-width: 300px;
      right: 5%;
      top: 10px;
    }
  }

  /* Scrollbar Styling */
  #seo-checker-panel::-webkit-scrollbar {
    width: 8px;
  }

  #seo-checker-panel::-webkit-scrollbar-track {
    background: var(--border-color);
    border-radius: 4px;
  }

  #seo-checker-panel::-webkit-scrollbar-thumb {
    background: var(--primary-color);
    border-radius: 4px;
  }

  /* Accessibility */
  .seo-item:focus-within {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }
`;

  // Utility Functions
  const Utils = {
    injectStyles() {
      if (document.getElementById("seo-checker-styles")) return;
      const style = document.createElement("style");
      style.id = "seo-checker-styles";
      style.textContent = STYLES;
      document.head.appendChild(style);
    },

    getElement(selector) {
      return document.querySelector(selector);
    },

    getElements(selector) {
      return document.querySelectorAll(selector);
    },

    normalizeText(text) {
      return text?.replace(/\s+/g, " ").trim() || "";
    },

    debounce(fn, delay) {
      let timeout;
      return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn(...args), delay);
      };
    },
  };

  // Category Validator
  class CategoryValidator {
    static validate() {
      const categoryElement = Utils.getElement(CONFIG.DOM_SELECTORS.category);
      if (!categoryElement) {
        return { valid: false, message: "لم يتم اختيار فئة" };
      }

      const category = Utils.normalizeText(
        categoryElement.getAttribute("title")?.split("|")[0]
      );
      const isValid = !CONFIG.INVALID_CATEGORIES.has(category);

      return {
        valid: isValid,
        message: `الفئة "${category}" ${
          isValid ? "صالحة" : "غير صالحة"
        } لتحليل SEO.`,
      };
    }
  }

  // SEO Analyzer
  class SEOAnalyzer {
    static analyze() {
      try {
        return {
          title: this.analyzeTitle(),
          meta: this.analyzeMeta(),
          headings: this.analyzeHeadings(),
          images: this.analyzeImages(),
          links: this.analyzeLinks(),
          content: this.analyzeContent(),
          performance: this.analyzePerformance(),
          ...this.checkInputCompletion(),
        };
      } catch (error) {
        console.error("SEO Analysis Error:", error);
        return { error: "فشل في إجراء تحليل SEO" };
      }
    }

    static analyzeTitle() {
      const titleElement = Utils.getElement(CONFIG.DOM_SELECTORS.titleInput);
      const title = Utils.normalizeText(titleElement?.value);
      const length = title.length;
      const issues = [];

      if (!title) issues.push("العنوان مفقود");
      else if (length < CONFIG.SEO_RULES.title.minLength)
        issues.push("العنوان قصير جداً");
      else if (length > CONFIG.SEO_RULES.title.maxLength)
        issues.push("العنوان طويل جداً");

      return {
        exists: !!titleElement,
        length,
        text: title,
        optimal:
          length >= CONFIG.SEO_RULES.title.minLength &&
          length <= CONFIG.SEO_RULES.title.maxLength,
        issues,
      };
    }

    static analyzeMeta() {
      const description = Utils.getElement(
        CONFIG.DOM_SELECTORS.descriptionEditor
      );
      const descText = Utils.normalizeText(description?.innerHTML);
      const keywords = Utils.getElement('meta[name="keywords"]');
      const viewport = Utils.getElement('meta[name="viewport"]');
      const robots = Utils.getElement('meta[name="robots"]');

      return {
        description: {
          exists: !!description,
          length: descText.length,
          text: descText,
          optimal:
            descText.length >= CONFIG.SEO_RULES.metaDescription.minLength &&
            descText.length <= CONFIG.SEO_RULES.metaDescription.maxLength,
        },
        keywords: {
          exists: !!keywords,
          content: keywords?.getAttribute("content") || "",
        },
        viewport: {
          exists: !!viewport,
          content: viewport?.getAttribute("content") || "",
        },
        robots: {
          exists: !!robots,
          content: robots?.getAttribute("content") || "",
        },
      };
    }

    static analyzeHeadings() {
      const headings = Utils.getElements("h1, h2, h3, h4, h5, h6");
      const h1s = Utils.getElements("h1");
      const h2s = Utils.getElements("h2");
      const h3s = Utils.getElements("h3");

      return {
        h1Count: h1s.length,
        h1Text: h1s.length > 0 ? Utils.normalizeText(h1s[0].textContent) : "",
        h2Count: h2s.length,
        h3Count: h3s.length,
        totalHeadings: headings.length,
        structure: Array.from(headings).map((h) => ({
          tag: h.tagName.toLowerCase(),
          text: Utils.normalizeText(h.textContent).substring(0, 50) + "...",
          length: h.textContent.length,
        })),
        optimal: h1s.length === 1,
      };
    }

    static analyzeImages() {
      const images = Utils.getElements(CONFIG.DOM_SELECTORS.productImages);
      let withoutAlt = 0;
      let withEmptyAlt = 0;
      let totalSize = 0;

      images.forEach((img) => {
        const alt = img.getAttribute("alt") || "";
        if (!alt) withoutAlt++;
        else if (alt.trim() === "") withEmptyAlt++;
        // Note: Size calculation requires actual image loading, handled in ImageAnalyzer
      });

      return {
        total: images.length,
        withoutAlt,
        withEmptyAlt,
        withValidAlt: images.length - withoutAlt - withEmptyAlt,
        altOptimal: withoutAlt === 0 && withEmptyAlt === 0,
      };
    }

    static analyzeLinks() {
      const links = Utils.getElements("a");
      let internal = 0;
      let external = 0;
      let withoutTitle = 0;
      let nofollow = 0;
      const currentDomain = window.location.hostname;

      links.forEach((link) => {
        const href = link.getAttribute("href");
        if (href) {
          if (href.startsWith("http") && !href.includes(currentDomain))
            external++;
          else internal++;
          if (!link.hasAttribute("title")) withoutTitle++;
          if (link.getAttribute("rel")?.includes("nofollow")) nofollow++;
        }
      });

      return {
        total: links.length,
        internal,
        external,
        withoutTitle,
        nofollow,
      };
    }

    static analyzeContent() {
      const bodyText = Utils.normalizeText(document.body.textContent);
      const words = bodyText.split(/\s+/).filter((word) => word.length > 0);
      const sentences = bodyText
        .split(/[.!?]+/)
        .filter((s) => s.trim().length > 0);

      return {
        wordCount: words.length,
        sentenceCount: sentences.length,
        avgWordsPerSentence:
          sentences.length > 0
            ? Math.round(words.length / sentences.length)
            : 0,
        readabilityOptimal:
          words.length >= CONFIG.SEO_RULES.content.minWords &&
          words.length <= CONFIG.SEO_RULES.content.maxWords,
      };
    }

    static analyzePerformance() {
      return {
        scriptCount: Utils.getElements("script").length,
        stylesheetCount: Utils.getElements('link[rel="stylesheet"]').length,
        inlineStyleCount: Utils.getElements("style").length,
        domElements: Utils.getElements("*").length,
      };
    }

    static checkInputCompletion() {
      const inputs = Utils.getElements(
        `${CONFIG.DOM_SELECTORS.formBody} input, ${CONFIG.DOM_SELECTORS.formBody} textarea, ${CONFIG.DOM_SELECTORS.formBody} select`
      );
      let allFilled = true;
      const noneCompleted = [];

      inputs.forEach((input) => {
        if (!input.value.trim()) {
          allFilled = false;
          noneCompleted.push(input);
          input.classList.add("error");
        } else {
          input.classList.remove("error");
        }
      });

      return { allFilled, noneCompleted };
    }
  }

  // Image Analyzer
  class ImageAnalyzer {
    static init() {
      const mainImageInput = Utils.getElement(
        CONFIG.DOM_SELECTORS.mainImageInput
      );
      const otherImagesInput = Utils.getElement(
        CONFIG.DOM_SELECTORS.otherImagesInput
      );

      if (mainImageInput) {
        mainImageInput.addEventListener(
          "change",
          Utils.debounce(this.handleImageUpload.bind(this), 200)
        );
      }
      if (otherImagesInput) {
        otherImagesInput.addEventListener(
          "change",
          Utils.debounce(this.handleBatchImageUpload.bind(this), 200)
        );
      }
    }

    static handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) this.analyzeImageFile(file);
    }

    static handleBatchImageUpload(event) {
      Array.from(event.target.files).forEach((file) =>
        this.analyzeImageFile(file)
      );
    }

    static analyzeImageFile(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = () => {
          const sizeKB = file.size / 1024;
          const format = file.type.split("/")[1];
          const issues = [];
          if (sizeKB > CONFIG.SEO_RULES.images.maxSizeKB)
            issues.push(`حجم الصورة كبير (${sizeKB.toFixed(2)}KB)`);
          if (
            img.width < CONFIG.SEO_RULES.images.minWidth ||
            img.height < CONFIG.SEO_RULES.images.minHeight
          )
            issues.push(`أبعاد الصورة صغيرة (${img.width}x${img.height})`);

          console.log(
            `Image: ${file.name}, Size: ${sizeKB.toFixed(2)}KB, Dimensions: ${
              img.width
            }x${img.height}, Format: ${format}, Issues: ${issues.join(", ")}`
          );
        };
      };
      reader.readAsDataURL(file);
    }
  }

  // SEO Panel
  class SEOPanel {
    static init() {
      this.createPanel();
      this.bindEvents();
      this.runAnalysis();
      this.loadTheme();
    }

    static createPanel() {
      if (Utils.getElement("#seo-checker-panel")) return;

      const panel = document.createElement("div");
      panel.id = "seo-checker-panel";
      panel.innerHTML = `
      <div class="seo-header">
        <h3>📊 SEO Checker</h3>
        <div>
          <button id="theme-toggle" class="theme-toggle" title="تبديل الوضع">🌙</button>
          <button id="seo-toggle" class="toggle-btn">−</button>
        </div>
      </div>
      <div class="seo-content">
        <div id="seo-results"></div>
        <button id="refresh-seo" class="refresh-btn">🔄 تحديث التحليل</button>
      </div>
    `;
      document.body.appendChild(panel);
    }

    static bindEvents() {
      const toggleBtn = Utils.getElement("#seo-toggle");
      const refreshBtn = Utils.getElement("#refresh-seo");
      const themeToggle = Utils.getElement("#theme-toggle");

      if (toggleBtn)
        toggleBtn.addEventListener("click", this.togglePanel.bind(this));
      if (refreshBtn)
        refreshBtn.addEventListener(
          "click",
          Utils.debounce(this.runAnalysis.bind(this), 200)
        );
      if (themeToggle)
        themeToggle.addEventListener("click", this.toggleTheme.bind(this));
    }

    static togglePanel() {
      const content = Utils.getElement(".seo-content");
      const toggle = Utils.getElement("#seo-toggle");
      if (content && toggle) {
        content.style.display =
          content.style.display === "none" ? "block" : "none";
        toggle.textContent = content.style.display === "none" ? "+" : "−";
      }
    }

    static toggleTheme() {
      const currentTheme =
        document.documentElement.getAttribute("data-theme") || "light";
      const newTheme = currentTheme === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("seo-theme", newTheme);

      const themeToggle = Utils.getElement("#theme-toggle");
      if (themeToggle) {
        themeToggle.textContent = newTheme === "light" ? "🌙" : "☀";
      }
    }

    static loadTheme() {
      const savedTheme = localStorage.getItem("seo-theme") || "light";
      document.documentElement.setAttribute("data-theme", savedTheme);
      const themeToggle = Utils.getElement("#theme-toggle");
      if (themeToggle) {
        themeToggle.textContent = savedTheme === "light" ? "🌙" : "☀";
      }
    }

    static runAnalysis() {
      const { valid, message } = CategoryValidator.validate();
      if (!valid) {
        alert(message);
        return;
      }
      const results = SEOAnalyzer.analyze();
      this.displayResults(results);
    }

    static displayResults(results) {
      const container = Utils.getElement("#seo-results");
      if (!container) return;

      container.innerHTML = `
      ${this.generateSection("title", results.title, "📝 العنوان", {
        status: (r) => (r.optimal ? "✅" : "⚠️"),
        main: (r) => `الطول: ${r.length} حرف`,
        detail: (r) => (r.text ? `"${r.text}"` : ""),
        issues: (r) => r.issues.join(", "),
      })}
      ${this.generateSection(
        "meta",
        results.meta.description,
        "🏷️ الوصف التعريفي",
        {
          status: (r) => (r.exists ? (r.optimal ? "✅" : "⚠️") : "❌"),
          main: (r) => `الطول: ${r.length} حرف`,
          detail: (r) => (r.text ? `"${r.text}"` : ""),
        }
      )}
      ${this.generateSection("headings", results.headings, "📋 العناوين", {
        status: (r) => (r.optimal ? "✅" : "⚠️"),
        main: (r) => `H1: ${r.h1Count}, H2: ${r.h2Count}, H3: ${r.h3Count}`,
        detail: (r) => (r.h1Text ? `H1: "${r.h1Text}"` : ""),
      })}
      ${this.generateSection("images", results.images, "🖼️ الصور", {
        status: (r) => (r.altOptimal ? "✅" : "⚠️"),
        main: (r) => `المجموع: ${r.total}, بدون Alt: ${r.withoutAlt}`,
      })}
      ${this.generateSection("links", results.links, "🔗 الروابط", {
        status: () => "ℹ️",
        main: (r) => `داخلية: ${r.internal}, خارجية: ${r.external}`,
      })}
      ${this.generateSection("content", results.content, "📊 المحتوى", {
        status: (r) => (r.readabilityOptimal ? "✅" : "⚠️"),
        main: (r) => `الكلمات: ${r.wordCount}`,
      })}
      ${this.generateSection("performance", results.performance, "⚡ الأداء", {
        status: () => "ℹ️",
        main: (r) => `Scripts: ${r.scriptCount}, CSS: ${r.stylesheetCount}`,
      })}
    `;
    }

    static generateSection(type, data, title, config) {
      return `
      <div class="seo-section">
        <h4>${title}</h4>
        <div class="seo-item ${
          data.optimal ? "good" : data.exists ? "warning" : "info"
        }">
          <span class="status">${config.status(data)}</span>
          <span>${config.main(data)}</span>
        </div>
        ${
          config.detail?.(data)
            ? `<div class="seo-detail">${config.detail(data)}</div>`
            : ""
        }
        ${
          data.issues?.length
            ? `<div class="seo-issues">${config.issues?.(data)}</div>`
            : ""
        }
      </div>
    `;
    }
  }
  // Observer
  class DOMObserver {
    static init() {
      const formContainer = Utils.getElement(
        CONFIG.DOM_SELECTORS.formContainer
      );
      if (!formContainer) return;

      const observer = new MutationObserver(
        Utils.debounce(() => {
          const { valid, message } = CategoryValidator.validate();
          if (!valid) alert(message);
        }, 200)
      );

      observer.observe(formContainer, {
        childList: true,
        characterData: true,
        subtree: true,
      });

      return observer;
    }
  }

  // Initialization
  const init = () => {
    try {
      Utils.injectStyles();
      DOMObserver.init();
      ImageAnalyzer.init();
      SEOPanel.init();
    } catch (error) {
      console.error("Initialization Error:", error);
      alert("فشل في تهيئة ملحق SEO Analyzer");
    }
  };

  // Start
  if (
    document.readyState === "complete" ||
    document.readyState === "interactive"
  ) {
    setTimeout(init, 0);
  } else {
    document.addEventListener("DOMContentLoaded", init);
  }
})();
