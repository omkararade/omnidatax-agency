import Types "../types/caseStudy";
import List "mo:core/List";
import Time "mo:core/Time";

module {
  /// Returns all case studies as an immutable array.
  public func getAllCaseStudies(
    caseStudies : List.List<Types.CaseStudy>
  ) : [Types.CaseStudy] {
    caseStudies.toArray();
  };

  /// Returns a single case study by id, or null if not found.
  public func getCaseStudyById(
    caseStudies : List.List<Types.CaseStudy>,
    id : Types.CaseStudyId,
  ) : ?Types.CaseStudy {
    caseStudies.find(func(cs) { cs.id == id });
  };

  /// Adds a new case study to the list. Returns the new id and the created record.
  public func addCaseStudy(
    caseStudies : List.List<Types.CaseStudy>,
    nextId : Nat,
    input : Types.CreateCaseStudyInput,
    now : Int,
  ) : (Types.CaseStudyId, Types.CaseStudy) {
    let cs : Types.CaseStudy = {
      id = nextId;
      title = input.title;
      clientType = input.clientType;
      industry = input.industry;
      keyMetric = input.keyMetric;
      keyMetricLabel = input.keyMetricLabel;
      problem = input.problem;
      approach = input.approach;
      tools = input.tools;
      results = input.results;
      iconName = input.iconName;
      createdAt = now;
      updatedAt = now;
    };
    caseStudies.add(cs);
    (nextId, cs);
  };

  /// Updates an existing case study by id. Returns the updated record or an error.
  public func updateCaseStudy(
    caseStudies : List.List<Types.CaseStudy>,
    id : Types.CaseStudyId,
    input : Types.UpdateCaseStudyInput,
    now : Int,
  ) : Types.UpdateCaseStudyResult {
    var found = false;
    var updated : ?Types.CaseStudy = null;
    caseStudies.mapInPlace(
      func(cs) {
        if (cs.id == id) {
          let u : Types.CaseStudy = {
            cs with
            title = input.title;
            clientType = input.clientType;
            industry = input.industry;
            keyMetric = input.keyMetric;
            keyMetricLabel = input.keyMetricLabel;
            problem = input.problem;
            approach = input.approach;
            tools = input.tools;
            results = input.results;
            iconName = input.iconName;
            updatedAt = now;
          };
          found := true;
          updated := ?u;
          u;
        } else {
          cs;
        };
      }
    );
    switch (updated) {
      case (?u) { #ok(u) };
      case (null) { #err("Case study not found") };
    };
  };

  /// Deletes a case study by id. Returns true if found and deleted, false otherwise.
  public func deleteCaseStudy(
    caseStudies : List.List<Types.CaseStudy>,
    id : Types.CaseStudyId,
  ) : Bool {
    let sizeBefore = caseStudies.size();
    let filtered = caseStudies.filter(func(cs) { cs.id != id });
    caseStudies.clear();
    caseStudies.append(filtered);
    caseStudies.size() < sizeBefore;
  };

  /// Seeds the list with 4 initial case studies if it is empty.
  public func seedIfEmpty(
    caseStudies : List.List<Types.CaseStudy>,
    nextIdRef : { var value : Nat },
    now : Int,
  ) {
    if (not caseStudies.isEmpty()) { return };

    let seeds : [Types.CreateCaseStudyInput] = [
      {
        title = "Up Stock — Market Intelligence Platform";
        clientType = "Fintech Startup";
        industry = "Financial Markets";
        keyMetric = "10K+";
        keyMetricLabel = "Ticker Rows";
        problem = "The client needed a comprehensive stock data pipeline covering 10,000+ tickers with 100+ columns including technical indicators, analysis ratings, and historical OHLCV data — all updated in near real-time.";
        approach = "Built a distributed data engineering pipeline that scrapes, normalises, and enriches stock data from multiple sources. Integrated AI-powered analysis ratings and automated indicator computation across the full ticker universe.";
        tools = ["Python", "Scrapy", "Pandas", "PostgreSQL", "Apache Airflow", "AI Analysis Engine"];
        results = [
          { metric = "10K+"; description = "Ticker Rows" },
          { metric = "100+"; description = "Data Columns" },
          { metric = "3 Weeks"; description = "Delivery Time" },
          { metric = "Real-Time"; description = "Data Updates" },
        ];
        iconName = "trending";
      },
      {
        title = "E-Commerce Competitor Intelligence";
        clientType = "Amazon Seller";
        industry = "E-Commerce";
        keyMetric = "5M+";
        keyMetricLabel = "Products Tracked";
        problem = "A large Amazon seller needed daily competitor pricing, BSR rankings, and review analytics across 5M+ ASINs to stay ahead in a competitive market.";
        approach = "Engineered a scalable web scraping infrastructure with rotating proxies, intelligent throttling, and delta-update pipelines. Built automated dashboards for pricing alerts and trend analysis.";
        tools = ["Python", "Scrapy", "Redis", "AWS Lambda", "MongoDB", "Power BI"];
        results = [
          { metric = "5M+"; description = "ASINs Monitored" },
          { metric = "Daily"; description = "Data Refresh" },
          { metric = "40%"; description = "Pricing Efficiency Gain" },
          { metric = "99.5%"; description = "Uptime" },
        ];
        iconName = "bar";
      },
      {
        title = "Market Research Automation Suite";
        clientType = "Market Research Firm";
        industry = "Market Research";
        keyMetric = "80%";
        keyMetricLabel = "Time Saved";
        problem = "A market research firm was spending hundreds of hours manually collecting and cleaning data from 50+ sources for quarterly reports.";
        approach = "Automated the entire data collection, validation, and reporting pipeline using AI agents that extract, classify, and summarise data from diverse web sources into structured reports.";
        tools = ["Python", "LangChain", "OpenAI", "Selenium", "Pandas", "Tableau"];
        results = [
          { metric = "80%"; description = "Time Saved" },
          { metric = "50+"; description = "Sources Automated" },
          { metric = "3x"; description = "Report Frequency" },
          { metric = "99%"; description = "Data Accuracy" },
        ];
        iconName = "zap";
      },
      {
        title = "AI-Powered Lead Enrichment Pipeline";
        clientType = "SaaS Company";
        industry = "B2B SaaS";
        keyMetric = "2M+";
        keyMetricLabel = "Leads Enriched";
        problem = "A B2B SaaS company needed to enrich 2M+ leads with firmographic data, tech stack signals, and intent scores to prioritise outbound sales efforts.";
        approach = "Designed a multi-source data enrichment pipeline combining web scraping, third-party API integrations, and an AI scoring model to classify and rank leads by conversion likelihood.";
        tools = ["Python", "FastAPI", "PostgreSQL", "OpenAI", "Clearbit API", "Airflow"];
        results = [
          { metric = "2M+"; description = "Leads Enriched" },
          { metric = "35%"; description = "Conversion Lift" },
          { metric = "4 Weeks"; description = "Time to Deploy" },
          { metric = "90%"; description = "Match Accuracy" },
        ];
        iconName = "cart";
      },
    ];

    for (seed in seeds.values()) {
      let (_, _) = addCaseStudy(caseStudies, nextIdRef.value, seed, now);
      nextIdRef.value += 1;
    };
  };
};
