/* assets/js/org-viz.js
 * CWK / DFW — Department collaboration map, v2
 * Vanilla JS, no dependencies
 */
(function () {
  'use strict';

  /* ─── DATA ─────────────────────────────────────────────────────────────── */
  var D = {
    departments: {
      S: {
        name: 'Sales', roles: null,
        tasks: [
          {task:'Keep opportunities active and nurtured till won or lost',level:1,collab:'PC/EX'},
          {task:'Public relations — get CWKA published, recognized, associated with our work',level:1,collab:''},
          {task:'Run consistent marketing campaign across multiple platforms',level:1,collab:''},
          {task:'Perform market research to target sales efforts and report quarterly',level:1,collab:''},
          {task:'Solicit bid opportunities from GCs',level:1,collab:''},
          {task:'Solicit bid opportunities from architects',level:1,collab:''},
          {task:'Develop relationships with client estimators',level:1,collab:''},
          {task:'Nurture relationships with key design firms to ensure ongoing opportunities',level:1,collab:''},
          {task:'Filter all incoming bid opportunities',level:1,collab:''},
          {task:'Schedule and run opportunity review meetings',level:1,collab:'PC'},
          {task:'Review appropriate opportunities and present to Precon',level:1,collab:'PC'},
          {task:'Intake all project bid collateral and create bid folders for approved opportunities',level:1,collab:'PC'},
          {task:'Set up opportunities in Airtable and manage metrics',level:1,collab:'PC'},
          {task:'Complete all required prequalification paperwork and maintain with GCs',level:1,collab:'FIN'},
          {task:'Submit bid RFIs to clarify scope and responsibility',level:2,collab:'PC'},
          {task:'Prepare material and subcontract RFQs to support Precon',level:2,collab:'PC'},
          {task:'Prepare install subcontract RFQs to support Precon',level:2,collab:'PC'},
          {task:'Prepare consultant subcontract RFQs to support Precon',level:2,collab:'PC'},
          {task:'Rhino model analysis to support Precon',level:1,collab:'E'},
          {task:'Participate in scope reviews to support Precon',level:2,collab:'PC/EX'},
          {task:'Participate in review of bid metrics',level:2,collab:'PC/EX'},
          {task:'Submit proposals to clients with Precon and keep opportunity active',level:2,collab:'PC'},
          {task:'Write design assist proposals',level:1,collab:'PC'},
          {task:'Participate in closing deals — manage communication, schedule interviews',level:2,collab:'PC/EX'},
          {task:'Help manage bid submittal schedules/extensions',level:1,collab:'PC'},
          {task:'Manage status of active bids and opportunities',level:2,collab:'PC'},
          {task:'Manage active and potential client database',level:1,collab:''},
          {task:'Manage and report pipeline/GoGet monthly with Finance for forecast',level:1,collab:'FIN'},
          {task:'Support hand-off of projects to PM',level:2,collab:'PC'},
          {task:'Design company collateral — logos, gear, gifts, packaging',level:1,collab:'EX'},
          {task:'Work with PC on development of "Feature Project" proposals',level:1,collab:'PC/EX'},
          {task:'Know bid scope well enough to have high-level discussions with client',level:1,collab:'PC'},
          {task:'Track opportunity volume to ensure appropriate volume for PC',level:1,collab:'PC'},
          {task:'Maintain website and other social media platforms',level:1,collab:''}
        ]
      },
      PC: {
        name: 'Preconstruction', roles: null,
        tasks: [
          {task:'Review bid opportunities presented by Sales and determine if bidding',level:1,collab:'S'},
          {task:'Develop and manage bid templates to connect with Production and Finance',level:1,collab:'PROD/FIN'},
          {task:'Review bid docs to determine vendor support needed',level:1,collab:''},
          {task:'Create scope take-off and review with client',level:1,collab:''},
          {task:'Submit bid RFIs to clarify scope and responsibilities',level:1,collab:'S'},
          {task:'Drawing markup/scope identification (Bluebeam)',level:1,collab:''},
          {task:'Develop build strategies and collateral during bid phase',level:1,collab:'PROD/EX'},
          {task:'Prepare vendor/material RFQs for support pricing',level:1,collab:'PUR'},
          {task:'Prepare install RFQs for support pricing',level:1,collab:'PUR'},
          {task:'Prepare consultant RFQs for support pricing',level:1,collab:'PUR'},
          {task:'Estimate engineering and fabrication labor',level:1,collab:'E/EX'},
          {task:'Prepare proposal for submittal to client',level:1,collab:'S'},
          {task:'Schedule internal bid review meetings',level:1,collab:'EX/S'},
          {task:'Scope review with client and scope leveling sheets',level:1,collab:'S'},
          {task:'Prepare and present bid metrics for "Best and Final"',level:1,collab:'EX/S'},
          {task:'Prepare and present opportunity metrics to support capacity planning',level:1,collab:'S/PROD'},
          {task:'Close the deal/negotiations directly with client, supported by Sales/EX',level:1,collab:'EX/S'},
          {task:'Precon owns getting a signed contract including internal reviews',level:1,collab:'FIN'},
          {task:'Review contract schedule and prepare PC Milestone Schedule for PM',level:1,collab:'PM'},
          {task:'Prepare all hand-off documents for Engineering/PM',level:1,collab:'S'},
          {task:'Enter all applicable project information for newly contracted projects in Epicor',level:1,collab:'FIN'},
          {task:'Manage status of active bids in Airtable with Sales',level:2,collab:'S'},
          {task:'Build estimating tools, precedent bid collateral, labor standards',level:1,collab:'E/FIN'},
          {task:'Research materials, vendors and suppliers to broaden network',level:2,collab:'PUR'},
          {task:'If install self-priced, solicit install bids post-award for PM',level:2,collab:'PM'},
          {task:'Support PM in preparation of new or large scope change requests',level:2,collab:'PM/FIN'},
          {task:'Support push to keep bids active until won or lost',level:2,collab:'S'},
          {task:'Track estimating load and volume metrics',level:1,collab:'S'},
          {task:'Work with Purchasing to expand vendor/consultant/resource pool',level:2,collab:'PUR'}
        ]
      },
      PM: {
        name: 'Project Management', roles: null,
        tasks: [
          {task:'Know the project and lead it',level:1,collab:'PC/EX'},
          {task:'Receive and distribute applicable CDs/specs/bid info to Engineering',level:1,collab:'PC/E'},
          {task:'Identify long-lead materials and drive these to release on time',level:1,collab:'PC/E/PUR'},
          {task:'Write the SOV/billing schedule and get approved by client',level:1,collab:'FIN'},
          {task:'Write the PM Milestone Schedule then manage its evolution',level:1,collab:'E/PROD'},
          {task:'Review install bids and select installer — PC to supply initial bids',level:1,collab:'PC/PUR'},
          {task:'Define install scope for award and negotiate install contract',level:1,collab:'PC'},
          {task:'Execute install subcontract supplied by Purchasing',level:1,collab:'PUR'},
          {task:'Execute structural engineering subcontract supplied by Purchasing',level:1,collab:'PUR'},
          {task:'Execute major vendor subcontracts/POs supplied by Purchasing',level:1,collab:'PUR'},
          {task:'Drive material BOM\'ing priorities and schedule',level:1,collab:'PUR'},
          {task:'Release all "Ready to buy" quickly, efficiently, intelligently',level:1,collab:'PUR'},
          {task:'Establish truck schedule and manage throughout project',level:1,collab:'PROD/SR'},
          {task:'Write, submit and track RFIs',level:1,collab:'E'},
          {task:'Schedule and run consultant project meetings',level:1,collab:'E'},
          {task:'Schedule and run client meetings',level:1,collab:'E'},
          {task:'Schedule and run internal project meetings',level:1,collab:'PROD/E/PUR'},
          {task:'Meeting notes for all project internal and external meetings',level:1,collab:''},
          {task:'Manage submittal schedule and deadlines',level:1,collab:'E'},
          {task:'Send submittal drawings to client and track against milestone schedule',level:1,collab:'E'},
          {task:'Receive redlines and provide clear direction to Engineering on how to respond',level:1,collab:'E'},
          {task:'Provide Engineering/Production with PCO direction related to client changes',level:1,collab:'E'},
          {task:'Get shop drawings fully approved on time',level:1,collab:'E'},
          {task:'Complete all field surveys/laser scans on time or establish Hold to\'s',level:1,collab:'E'},
          {task:'PM owns installation coordination — Install Manager supports',level:1,collab:'PROD'},
          {task:'Attend site meetings/write field reports and distribute',level:1,collab:''},
          {task:'Schedule and manage internal install resources',level:1,collab:'PROD'},
          {task:'Communicate shipping logistics/needs',level:1,collab:'SR'},
          {task:'Communicate with site on trucking info/updates/issues received from SR',level:1,collab:'SR'},
          {task:'Write and submit scope change CRs; work with PC on new/large CRs',level:1,collab:'PC'},
          {task:'Get COs from client quickly so that we can invoice',level:1,collab:'FIN'},
          {task:'Monthly project health and billing projections',level:1,collab:'FIN'},
          {task:'Action orders — samples/mockups/rework (initiate, kickoff, handoff)',level:1,collab:'PROD'},
          {task:'Punch list project prior to client — PM (team) owns field review',level:1,collab:''},
          {task:'Collections — contract issues',level:2,collab:'FIN'},
          {task:'Provide control samples to SR for QA/QC receiving',level:1,collab:'SR'}
        ]
      },
      E: {
        name: 'Engineering',
        roles: [
          {
            code: 'PA',
            name: 'Project Advisor',
            note: 'Senior designation — final authority on build strategy. Non-billable (indirect 017 ENG Admin). Drawn from senior Engineering, Production, or Executive staff. Always a separate person from the Lead Engineer on any given project.'
          },
          {
            code: 'LE',
            name: 'Lead Engineer',
            note: 'Ad hoc project-level designation — technical and administrative anchor for the scope. Billable to the Lead Coordination operation on the project\'s PROJ.ENG bucket job.'
          },
          {
            code: 'EA',
            name: 'Eng. Assistant',
            note: 'Epicor job creation, scheduling, and BOM setup. In practice today, Production Engineers perform EA duties for their own assignments.'
          }
        ],
        tasks: [
          {task:'Receive CDs, learn the project — ask PM/PC questions',level:1,collab:'PC/PM'},
          {task:'Communicate engineering schedule projections to PM; production scheduling managed by Master Scheduler via Epicor backscheduling',level:1,collab:'PM'},
          {task:'Determine scope requiring build strategy vs. fabrication standards — resolved in PA working session',level:1,collab:'PA'},
          {task:'Identify long-lead materials and flag to PM early',level:2,collab:'PM'},
          {task:'Develop and manage design engineering deliverables and hours',level:1,collab:'PM'},
          {task:'PA working session — review scope, develop build strategy, get green light for FE',level:1,collab:'PA'},
          {task:'Develop fabrication engineering drawings and models for production engineering',level:1,collab:'EX/PM'},
          {task:'Develop additional collateral needed for client approval',level:1,collab:''},
          {task:'BOM entry of all needed material throughout the FE phase',level:1,collab:'PUR'},
          {task:'Flag long-lead materials to PM; confirm lead times via Purchasing/Epicor',level:1,collab:'PM/PUR'},
          {task:'Participate in PM-run consultant meetings',level:2,collab:'PM'},
          {task:'Participate in PM-run client meetings',level:2,collab:'PM'},
          {task:'Submit RFIs to PM for submittal to client',level:1,collab:'PM'},
          {task:'Understand the production schedule and manage submittals to support it',level:1,collab:'PROD'},
          {task:'Optimize material take-offs to update BOMs for final orders',level:1,collab:'PUR'},
          {task:'Optimize, nest and program for CNC machining',level:1,collab:''},
          {task:'Design fixtures for custom machining',level:1,collab:'PROD'},
          {task:'Submit drawings and models to PM for submittal to client',level:1,collab:'PM'},
          {task:'Intake all updated CD collateral post-handoff and report changes to PM',level:1,collab:'PM'},
          {task:'Manage engineering submittal log',level:1,collab:''},
          {task:'Manage internal drawing review and approval process (PA review)',level:1,collab:''},
          {task:'Upload models and clash detect per contract BIM requirements',level:1,collab:''},
          {task:'Attend BIM coordination meetings when applicable',level:1,collab:''},
          {task:'Assemble and deliver work order travelers to Production (PE responsibility)',level:1,collab:'PROD'},
          {task:'Support install when needed',level:2,collab:'PM'},
          {task:'Support Production during fabrication',level:2,collab:'PROD'},
          {task:'Support Precon engineering when needed',level:2,collab:'S/PC'},
          {task:'Participate in hand-off meetings to Production when needed',level:2,collab:'PROD'},
          {task:'Manage all engineering software licenses',level:1,collab:'FIN'},
          {task:'Manage all engineering software upgrades',level:1,collab:'EX'},
          {task:'Maintain engineering standards and communicate to team',level:1,collab:'EX'},
          {task:'Provide SR drawings to review incoming materials for QA/QC',level:1,collab:'SR'}
        ]
      },
      PUR: {
        name: 'Purchasing', roles: null,
        tasks: [
          {task:'Start each project by establishing material purchasing channels',level:1,collab:'PM/PC'},
          {task:'Work with Production/PC to establish specialty sources',level:1,collab:'PROD/EX'},
          {task:'Compile specialty purchase collateral and review with specialty sources',level:1,collab:'E/PM'},
          {task:'Support long-lead material review per project with PC/PM/Production',level:1,collab:'PM'},
          {task:'Review and prioritize incoming purchase requests based on milestone schedules',level:1,collab:'E/PM'},
          {task:'Reference inventory updates from SR for allocation',level:1,collab:'SR'},
          {task:'Receive BOMs from Engineering and prepare POs',level:1,collab:'E'},
          {task:'Write installation contracts for PM submittal',level:2,collab:'PC/PM'},
          {task:'Write structural engineering contract and submit (PM supports)',level:1,collab:'E/PM'},
          {task:'Write vendor custom supply contracts and submit (PM supports)',level:1,collab:'E/PM'},
          {task:'Manage and expand vendor/subcontractor network',level:1,collab:'PC'},
          {task:'Write POs for all facility/company/department requisitions',level:1,collab:'PROD'},
          {task:'Negotiate SOV with key vendors/suppliers to support project cashflow',level:1,collab:'PM'},
          {task:'Negotiate payment terms with suppliers and vendors',level:1,collab:'FIN'},
          {task:'Complete FSC paperwork with Finance for PMs to submit on projects',level:1,collab:'FIN/PM'},
          {task:'Maintain company vehicle registrations',level:1,collab:'FIN'},
          {task:'Communicate vendor problems and provide options to PM/Production/SR',level:1,collab:'PM/PROD'},
          {task:'Follow up on POs to confirm status',level:1,collab:'SR'},
          {task:'Provide lead times for materials to Precon',level:1,collab:'PC'},
          {task:'Provide lead times for materials to Engineering',level:1,collab:'E'},
          {task:'Provide lead times for materials to Project Management',level:1,collab:'PM'},
          {task:'Purchase all min/max stock supported by SR',level:1,collab:'SR'},
          {task:'Maintain vendor managed inventory',level:1,collab:'SR'},
          {task:'Communicate insurance requirements to vendors/installers',level:1,collab:'PM'},
          {task:'Provide vendor insurance paperwork to PMs for submittal',level:1,collab:'PM'},
          {task:'Coordinate MWBE/labor paperwork requirements for vendors/install',level:1,collab:'PM'},
          {task:'Establish universal subcontract with new vendors',level:1,collab:'PM'},
          {task:'Establish project-based specific contract tied to universal',level:1,collab:'PM'},
          {task:'Coordinate and obtain EMR rating paperwork from subcontractors',level:1,collab:'PM'},
          {task:'Credit applications — supplied to Finance to be executed',level:1,collab:'FIN'},
          {task:'Provide SDS sheets to Production for all products',level:1,collab:'PROD'},
          {task:'Forward invoices to Finance (mail, scanned, emailed)',level:1,collab:'FIN'},
          {task:'Reconcile project material invoices to PO',level:2,collab:'FIN'}
        ]
      },
      PROD: {
        name: 'Production', roles: null,
        tasks: [
          {task:'Manage facility production/shop operations',level:1,collab:'EX'},
          {task:'CNC/machine product and subassemblies in the Mill department',level:1,collab:''},
          {task:'Assemble/craft product and subassemblies in the Bench department',level:1,collab:''},
          {task:'Finish/prepare product and subassemblies in the Finish department',level:1,collab:''},
          {task:'Expand fabrication capabilities (upholstery, metal, composites)',level:1,collab:''},
          {task:'Complete finish samples/mockups to support project material and detail approvals',level:1,collab:'PM'},
          {task:'Define where work will be produced (NH/CO)',level:2,collab:'EX'},
          {task:'Define detail level of job transfer — identify opportunities to build in-house vs. outsource',level:2,collab:'EX'},
          {task:'Participate in build strategy review (PA working session)',level:2,collab:'E/EX'},
          {task:'Support Precon with feedback on labor hours for complex bids',level:2,collab:'PC'},
          {task:'Manage company capacity schedule and present bi-weekly',level:1,collab:''},
          {task:'Master scheduling and project scope entry into Epicor',level:1,collab:''},
          {task:'QA/QC of outgoing finished goods prior to shipping/receiving',level:1,collab:'SR'},
          {task:'Research materials and products to support means and methods of fabrication',level:1,collab:'PUR'},
          {task:'QA/QC of incoming materials',level:2,collab:'PUR'},
          {task:'Maintain all equipment',level:1,collab:''},
          {task:'Maintain facility and infrastructure',level:1,collab:'FIN/EX'},
          {task:'Maintain company vehicles',level:1,collab:'FIN'},
          {task:'Requisition facility materials, supplies and small tools',level:1,collab:'PUR'},
          {task:'Take-off/requisition project finishes',level:1,collab:'PUR'},
          {task:'Take-off/requisition project tooling — Mill',level:1,collab:'PUR'},
          {task:'Install — scheduling CWKA employees as install resource',level:1,collab:'PM'},
          {task:'Installers who are in the field report to Project Management during install',level:2,collab:'PM'},
          {task:'Install — provide all necessary tools and equipment support',level:1,collab:'PM'},
          {task:'Keep Production employees efficient, productive and safe',level:1,collab:'HR'},
          {task:'Perform all performance reviews with individual Production employees',level:1,collab:'EX/HR'},
          {task:'QA/QC issues reported by SR are resolved by Production and communicated to PM',level:1,collab:'SR/PM'},
          {task:'Make build method judgment calls for quality, details, standards',level:1,collab:'EX'},
          {task:'Manage and support a safe working environment',level:1,collab:'HR'},
          {task:'Run safety meetings and enforce safety regulations',level:1,collab:'HR'},
          {task:'Support emissions reporting',level:2,collab:'HR/PUR'},
          {task:'Manage workflow of assemblies during fabrication — move FGI to SR when complete',level:1,collab:'SR'},
          {task:'Wrap and pack FGI to support SR',level:2,collab:'SR'},
          {task:'Load trucks to support SR',level:2,collab:'SR'}
        ]
      },
      SR: {
        name: 'Shipping / Receiving', roles: null,
        tasks: [
          {task:'Receive and report incoming materials via Epicor',level:1,collab:''},
          {task:'QA/QC of incoming materials — use reporting structure/sequence',level:1,collab:'PUR/PROD'},
          {task:'Notify Purchasing about material intake issues',level:1,collab:'PUR'},
          {task:'Order and coordinate trucks for delivery to project sites or vendors',level:1,collab:'PM'},
          {task:'QA/QC of outgoing finished goods — Production owns initial review',level:1,collab:'PROD'},
          {task:'Packing/wrapping FGI',level:1,collab:'PROD'},
          {task:'Loading trucks',level:1,collab:'PROD'},
          {task:'Track inventory and report back to Epicor/update BOM',level:1,collab:'PUR'},
          {task:'Requisition shipping/packing supplies — min/max',level:1,collab:'PUR'},
          {task:'Create packing list using orders-by-truck',level:1,collab:'PM'},
          {task:'FSC paperwork/signage',level:1,collab:'PROD/FIN'},
          {task:'Send FedEx — present cost to PM for approval',level:1,collab:'PM'},
          {task:'Mail intake and distribution',level:1,collab:''},
          {task:'Send shipping ticket/packing slip of incoming product to Finance',level:1,collab:'PM'},
          {task:'Issue materials to jobs — only if on the BOM',level:1,collab:'PROD'},
          {task:'Receive jobs to FGI and complete job',level:1,collab:'PROD'},
          {task:'Reconcile unissued materials',level:1,collab:'PROD'},
          {task:'Raw material handling/distribution in coordination with Production',level:1,collab:'PROD'},
          {task:'Kit material and issue to floor',level:1,collab:'PROD'},
          {task:'Scan FGI as loaded onto trucks',level:1,collab:'PROD'},
          {task:'Reallocate FGI to alternate truck when necessary',level:1,collab:''},
          {task:'Manage internal driver for deliveries — schedule with Production',level:1,collab:'PROD'},
          {task:'Communicate with PM on truck status — PM communicates with site',level:1,collab:'PM'},
          {task:'Communicate vendor problems and provide suggestions to PM/Production',level:1,collab:'PROD'},
          {task:'Shipping notification — provide report to PM for distribution',level:1,collab:'PM'},
          {task:'Work with Purchasing to understand incoming materials and volumes for storage',level:1,collab:'PUR/PROD'},
          {task:'Manage shipping of product into facility using FedEx account',level:1,collab:'PUR'}
        ]
      },
      FIN: {
        name: 'Finance', roles: null,
        tasks: [
          {task:'Project accounting and reporting to PMs for project health meetings',level:1,collab:'PM'},
          {task:'Provide PM with AP reporting for large payments/subcontracts to approve',level:1,collab:'PM'},
          {task:'Company AP reporting',level:1,collab:'EX'},
          {task:'Provide PM with project AR status so they can support collections',level:1,collab:'PM'},
          {task:'Collection reporting and tracking',level:1,collab:'PM/EX'},
          {task:'Collections calls with clients',level:1,collab:'PM/EX'},
          {task:'Monthly financial statements',level:1,collab:'EX'},
          {task:'Annual financial statements',level:1,collab:'EX'},
          {task:'Bank reporting, communication, borrowing basis paperwork',level:1,collab:'EX'},
          {task:'Annual budget preparation and director meetings',level:1,collab:'EX'},
          {task:'Develop departmental budgets and review quarterly with directors',level:1,collab:'EX'},
          {task:'Monthly and annual financial reviews',level:1,collab:'EX'},
          {task:'Prepare warranty letters — EX signs, Finance provides to PM for submittal',level:1,collab:'EX/PM'},
          {task:'Certificate of insurance provided to clients, maintain for projects',level:1,collab:'PM'},
          {task:'FSC paperwork — support financial reporting, Purchasing manages with PM',level:1,collab:'PUR/PM'},
          {task:'State licensing and reporting for taxes',level:2,collab:'EX'},
          {task:'W9 paperwork (vendor/CWKA to client)',level:1,collab:'HR'},
          {task:'Gather project-specific bonding forms and secure bonds',level:1,collab:'EX/PC'},
          {task:'IT/ERP administration',level:1,collab:'PROD/EX'},
          {task:'Reconcile invoices',level:1,collab:'PUR'},
          {task:'Enter invoices into system for non-project purchases',level:1,collab:''},
          {task:'Set up new projects and communicate job number assignments',level:1,collab:'PC'},
          {task:'Credit card payments, management, controls',level:1,collab:'PUR'},
          {task:'AP clerk reviews invoices/flags discrepancies to Purchasing',level:1,collab:'PUR'},
          {task:'Payroll management — financial',level:1,collab:'HR'},
          {task:'Cash forecasting and cash management',level:1,collab:''},
          {task:'Risk management — financial/data',level:1,collab:'HR'},
          {task:'Financial controls — reporting and enforcement',level:1,collab:'EX'},
          {task:'Manage facility accounts',level:1,collab:'PUR/PROD'},
          {task:'Support preparation of prequalification paperwork for GCs',level:2,collab:'S'},
          {task:'Schedule Post Mortem meeting with PC/PM/Engineering/Production',level:1,collab:'ALL'},
          {task:'Maintain company vehicle registrations',level:1,collab:'PROD'}
        ]
      },
      HR: {
        name: 'Human Resources', roles: null,
        tasks: [
          {task:'Manage company-wide recruiting efforts',level:1,collab:'EX'},
          {task:'Write and publish open job opportunities',level:1,collab:'EX'},
          {task:'Screen candidates and schedule interviews',level:1,collab:'EX'},
          {task:'Negotiate employment terms, job offers, details with prospective employees',level:1,collab:''},
          {task:'Write job descriptions with department heads',level:2,collab:'EX'},
          {task:'Manage on-boarding with department heads',level:2,collab:'EX'},
          {task:'Develop and track department head review schedules',level:1,collab:'EX'},
          {task:'Establish review standards; educate and support department heads',level:1,collab:'EX'},
          {task:'Work with employees one-on-one',level:1,collab:''},
          {task:'Oversee and manage all benefits accounts',level:1,collab:'EX'},
          {task:'Lead safety committees — delegated to Production for implementation',level:1,collab:'PROD'},
          {task:'Culture development and maintenance',level:1,collab:'EX'},
          {task:'Liability and risk management — insurance',level:1,collab:'FIN/EX'},
          {task:'Payroll management — employee support',level:1,collab:'FIN/EX'},
          {task:'HR crisis management',level:1,collab:'EX'},
          {task:'Personnel training and development — initiatives and support',level:2,collab:'EX'},
          {task:'Support department directors during terminations',level:2,collab:'EX'},
          {task:'Company communications',level:1,collab:'EX'},
          {task:'Company event planning',level:1,collab:'EX'},
          {task:'Legal — HR/corporate',level:1,collab:'EX'},
          {task:'Complete termination process, exit interview, COBRA',level:1,collab:'EX'},
          {task:'Meet with department heads to understand staffing needs',level:2,collab:''},
          {task:'Manage list of all job titles and maintain/update job descriptions',level:1,collab:'EX'},
          {task:'Establish and maintain structure and tools for onboarding',level:1,collab:''},
          {task:'Pre-employment tasks required for hiring and onboarding',level:1,collab:''},
          {task:'Establish, maintain and communicate safety policies to company',level:1,collab:'PROD'},
          {task:'Support Sales with the prequalification process — safety',level:2,collab:'S'},
          {task:'Create and maintain all personnel, medical, and workers comp records',level:1,collab:''},
          {task:'Manage records to align with record retention laws',level:1,collab:''},
          {task:'Update air emissions report and schedule haz-mat pickup/delivery',level:1,collab:'PROD'},
          {task:'Submit required quarterly disposal report',level:1,collab:'PROD'},
          {task:'Set up new employees with equipment and software',level:1,collab:'FIN'},
          {task:'Record employee equipment for tracking company property',level:1,collab:'FIN'},
          {task:'Update and maintain company employment handbook and compliance posters',level:1,collab:''}
        ]
      },
      EX: {
        name: 'Executive', roles: null,
        tasks: [
          {task:'Banking/capital management',level:2,collab:'FIN'},
          {task:'Culture development and maintenance',level:1,collab:'HR'},
          {task:'Legal — all',level:1,collab:'FIN/HR'},
          {task:'Business structure management',level:1,collab:''},
          {task:'Company vision and communication',level:1,collab:''},
          {task:'Liability/risk management',level:1,collab:'FIN/HR'},
          {task:'Leadership development and mentoring',level:1,collab:'HR'},
          {task:'Participate in bid metrics review',level:2,collab:'PC'},
          {task:'Collections calls with clients',level:2,collab:'FIN'},
          {task:'Reviews of directors',level:1,collab:''},
          {task:'Support Precon in closing deals',level:2,collab:'PC/S'},
          {task:'HR employee and crisis management',level:1,collab:'HR'},
          {task:'Manage company-wide growth projections to support recruiting',level:1,collab:'HR'},
          {task:'Support bonding requirements',level:1,collab:'FIN'},
          {task:'Material procurement strategy',level:2,collab:'PROD/PUR'},
          {task:'Systems development/implementation',level:1,collab:''},
          {task:'Infrastructure strategy',level:1,collab:''},
          {task:'Growth strategy',level:1,collab:''},
          {task:'Capabilities strategy',level:1,collab:''},
          {task:'Lead/support project development',level:2,collab:'PM'},
          {task:'Client relationship development',level:2,collab:'PM'},
          {task:'Define where work will be produced (NH/CO)',level:1,collab:'PROD'}
        ]
      }
    },
    edges: [
      {source:'PC',   target:'S',    weight:32},
      {source:'EX',   target:'S',    weight:7},
      {source:'FIN',  target:'S',    weight:3},
      {source:'E',    target:'S',    weight:2},
      {source:'PROD', target:'PC',   weight:4},
      {source:'FIN',  target:'PC',   weight:7},
      {source:'EX',   target:'PC',   weight:7},
      {source:'PC',   target:'PUR',  weight:9},
      {source:'E',    target:'PC',   weight:4},
      {source:'PC',   target:'PM',   weight:10},
      {source:'EX',   target:'PM',   weight:3},
      {source:'E',    target:'PM',   weight:25},
      {source:'PM',   target:'PUR',  weight:26},
      {source:'FIN',  target:'PM',   weight:12},
      {source:'PROD', target:'PM',   weight:11},
      {source:'PM',   target:'SR',   weight:11},
      {source:'E',    target:'PROD', weight:4},
      {source:'E',    target:'EX',   weight:5},
      {source:'E',    target:'PUR',  weight:3},
      {source:'E',    target:'FIN',  weight:1},
      {source:'E',    target:'SR',   weight:1},
      {source:'PROD', target:'PUR',  weight:11},
      {source:'EX',   target:'PUR',  weight:2},
      {source:'PUR',  target:'SR',   weight:11},
      {source:'FIN',  target:'PUR',  weight:12},
      {source:'EX',   target:'PROD', weight:9},
      {source:'PROD', target:'SR',   weight:20},
      {source:'FIN',  target:'PROD', weight:5},
      {source:'HR',   target:'PROD', weight:9},
      {source:'FIN',  target:'SR',   weight:1},
      {source:'EX',   target:'FIN',  weight:21},
      {source:'FIN',  target:'HR',   weight:7},
      {source:'EX',   target:'HR',   weight:26},
      {source:'HR',   target:'S',    weight:1}
    ]
  };

  /* ─── SHORT NAMES (shown inside nodes) ─────────────────────────────────── */
  var SHORTS = {
    S:    'Sales',
    PC:   'Precon',
    PM:   'Proj Mgmt',
    E:    'Engineering',
    PUR:  'Purchasing',
    PROD: 'Production',
    SR:   'Shipping',
    FIN:  'Finance',
    HR:   'HR',
    EX:   'Executive'
  };

  /* ─── COLORS ────────────────────────────────────────────────────────────── */
  var C = {
    S:    {bg:'#1B4332', fg:'#D8F3DC', ac:'#95D5B2'},
    PC:   {bg:'#3A0CA3', fg:'#E2D9F3', ac:'#B8A9E8'},
    PM:   {bg:'#0B3D91', fg:'#D6E4F0', ac:'#7EB0D5'},
    E:    {bg:'#9D0208', fg:'#FADBD8', ac:'#E07C7C'},
    PUR:  {bg:'#7B2D26', fg:'#F5E6E0', ac:'#D4A59A'},
    PROD: {bg:'#3D405B', fg:'#E8E8ED', ac:'#A8A8C0'},
    SR:   {bg:'#5A3E1B', fg:'#F0E6D3', ac:'#C4A97D'},
    FIN:  {bg:'#14532D', fg:'#D1FAE5', ac:'#6EE7B7'},
    HR:   {bg:'#6B21A8', fg:'#F3E8FF', ac:'#C084FC'},
    EX:   {bg:'#1E1E1E', fg:'#F0F0F0', ac:'#A0A0A0'}
  };

  /* ─── POSITIONS (circular layout) ──────────────────────────────────────── */
  var POS = (function () {
    var codes = ['S','PC','PM','E','PUR','PROD','SR','FIN','HR','EX'];
    var cx = 300, cy = 262, r = 190, p = {};
    codes.forEach(function (c, i) {
      var a = (2 * Math.PI * i / codes.length) - Math.PI / 2;
      p[c] = {x: Math.round(cx + r * Math.cos(a)), y: Math.round(cy + r * Math.sin(a))};
    });
    return p;
  }());

  /* ─── STATE ─────────────────────────────────────────────────────────────── */
  var sel = null;

  /* ─── HELPERS ───────────────────────────────────────────────────────────── */
  function esc(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function getHL(code) {
    var s = {};
    s[code] = true;
    D.edges.forEach(function (e) {
      if (e.source === code) s[e.target] = true;
      if (e.target === code) s[e.source] = true;
    });
    return s;
  }

  function maxWeight() {
    var m = 0;
    D.edges.forEach(function (e) { if (e.weight > m) m = e.weight; });
    return m;
  }

  /* ─── SVG ───────────────────────────────────────────────────────────────── */
  function buildSVG() {
    var hl = sel ? getHL(sel) : {};
    var mw = maxWeight();
    var html = '';

    /* edges */
    D.edges.forEach(function (e) {
      var p1 = POS[e.source], p2 = POS[e.target];
      if (!p1 || !p2) return;
      var isHl = sel && hl[e.source] && hl[e.target];
      var op = sel ? (isHl ? 0.85 : 0.05) : Math.max(0.07, e.weight / mw * 0.5);
      var w  = Math.max(1, e.weight / mw * 8);
      var stroke = isHl ? C[sel].ac : '#bbb';
      html += '<line x1="' + p1.x + '" y1="' + p1.y + '" x2="' + p2.x + '" y2="' + p2.y +
              '" stroke="' + stroke + '" stroke-width="' + (isHl ? w + 1 : w) +
              '" opacity="' + op.toFixed(2) + '" stroke-linecap="round"/>';
    });

    /* weight labels on highlighted edges */
    if (sel) {
      D.edges.forEach(function (e) {
        if (!hl[e.source] || !hl[e.target]) return;
        var p1 = POS[e.source], p2 = POS[e.target];
        var mx = Math.round((p1.x + p2.x) / 2);
        var my = Math.round((p1.y + p2.y) / 2);
        html += '<text x="' + mx + '" y="' + my + '" text-anchor="middle" dy="-5"' +
                ' fill="' + C[sel].ac + '" font-size="11" font-family="monospace"' +
                ' font-weight="600" opacity="0.9">' + e.weight + '</text>';
      });
    }

    /* nodes */
    Object.keys(POS).forEach(function (code) {
      var p    = POS[code];
      var dept = D.departments[code];
      var isSel = sel === code;
      var isHl  = !sel || hl[code];
      var c    = C[code];
      var nr   = isSel ? 50 : 44;
      var op   = (!sel || isHl) ? 1 : 0.2;
      var pri  = dept.tasks.filter(function (t) { return t.level === 1; }).length;
      var shortName = SHORTS[code] || '';

      var glow = isSel
        ? '<circle cx="' + p.x + '" cy="' + p.y + '" r="' + (nr + 5) +
          '" fill="none" stroke="' + c.ac + '" stroke-width="2" opacity="0.45"/>'
        : '';
      var ring = '<circle cx="' + p.x + '" cy="' + p.y + '" r="' + nr +
                 '" fill="' + c.bg + '" stroke="' + (isSel ? c.ac : 'rgba(0,0,0,0.08)') +
                 '" stroke-width="' + (isSel ? 2.5 : 1) + '"/>';
      var lbl  = '<text x="' + p.x + '" y="' + (p.y - 9) +
                 '" text-anchor="middle" fill="' + c.fg +
                 '" font-size="13" font-weight="700" font-family="monospace">' + code + '</text>';
      var sub  = '<text x="' + p.x + '" y="' + (p.y + 5) +
                 '" text-anchor="middle" fill="' + c.fg +
                 '" font-size="8" font-family="monospace" opacity="0.75">' + shortName + '</text>';
      var cnt  = '<text x="' + p.x + '" y="' + (p.y + 17) +
                 '" text-anchor="middle" fill="' + c.ac +
                 '" font-size="8" font-family="monospace">' + pri + '</text>';
      /* role indicator dot for E */
      var dot  = dept.roles
        ? '<circle cx="' + (p.x + nr - 7) + '" cy="' + (p.y - nr + 7) +
          '" r="5" fill="' + c.ac + '" opacity="0.9"/>'
        : '';

      html += '<g class="oviz-node" data-code="' + code +
              '" style="cursor:pointer;opacity:' + op + ';transition:opacity 0.2s">' +
              glow + ring + lbl + sub + cnt + dot + '</g>';
    });

    return html;
  }

  /* ─── PANEL ─────────────────────────────────────────────────────────────── */
  function buildPanel(code) {
    var dept = D.departments[code];
    var c    = C[code];
    var pri  = dept.tasks.filter(function (t) { return t.level === 1; });
    var sup  = dept.tasks.filter(function (t) { return t.level === 2; });

    /* top collaborators */
    var collabs = D.edges
      .filter(function (e) { return e.source === code || e.target === code; })
      .map(function (e) {
        return {partner: e.source === code ? e.target : e.source, weight: e.weight};
      })
      .sort(function (a, b) { return b.weight - a.weight; })
      .slice(0, 6);

    var chips = collabs.map(function (cl) {
      var cc = C[cl.partner];
      return '<span class="oviz-chip" style="background:' + cc.bg + ';color:' + cc.fg + '">' +
             cl.partner + '<span class="oviz-chip-weight"> ×' + cl.weight + '</span></span>';
    }).join('');

    /* renamed-department note */
    var renamedNote = '';
    if (code === 'PUR')  renamedNote = '<div class="oviz-renamed">Formerly: Supply Chain (SC)</div>';
    if (code === 'PROD') renamedNote = '<div class="oviz-renamed">Formerly: Operations (OPS)</div>';

    /* transient roles section */
    var roleSection = '';
    if (dept.roles && dept.roles.length) {
      var items = dept.roles.map(function (role) {
        return '<div class="oviz-role-item">' +
               '<span class="oviz-role-badge" style="background:' + c.bg +
               ';color:' + c.fg + ';border:1px solid ' + c.ac + '">' + role.code + '</span>' +
               '<div><div class="oviz-role-name">' + esc(role.name) + '</div>' +
               '<div class="oviz-role-note">' + esc(role.note) + '</div></div>' +
               '</div>';
      }).join('');
      roleSection = '<div class="oviz-section-label">Transient Designations</div>' +
                    '<div class="oviz-roles">' + items + '</div>';
    }

    /* task list */
    function taskRow(t, isSupport) {
      var collab = (t.collab && t.collab !== '' && t.collab !== '-')
        ? '<div class="oviz-task-collab">with ' + esc(t.collab) + '</div>' : '';
      return '<div class="oviz-task-item' + (isSupport ? ' oviz-task-support' : '') + '">' +
             '<span class="oviz-dot' + (isSupport ? ' oviz-dot-sup' : '') +
             '" style="' + (isSupport ? 'border-color:' + c.ac : 'background:' + c.ac) + '"></span>' +
             '<div class="oviz-task-text">' + esc(t.task) + collab + '</div>' +
             '</div>';
    }

    var taskHTML = pri.map(function (t) { return taskRow(t, false); }).join('');
    if (sup.length) {
      taskHTML += '<div class="oviz-section-label oviz-sup-label">Supporting Role</div>';
      taskHTML += sup.map(function (t) { return taskRow(t, true); }).join('');
    }

    return '<div class="oviz-panel-header" style="background:' + c.bg +
           ';border-bottom:1px solid ' + c.ac + '44">' +
           '<div style="display:flex;justify-content:flex-end;padding:6px 10px 0">' +
           '<button class="oviz-close-btn">✕ close</button>' +
           '</div>' +
           '<div class="oviz-panel-title">' +
           '<span class="oviz-panel-code" style="color:' + c.fg + '">' + code + '</span>' +
           '<span class="oviz-panel-name" style="color:' + c.ac + '">' + esc(dept.name) + '</span>' +
           '</div>' +
           renamedNote +
           '<div class="oviz-panel-counts">' +
           '<span style="color:' + c.fg + '">' + pri.length + ' primary</span>' +
           '<span style="color:' + c.ac + ';opacity:0.7"> · ' + sup.length + ' supporting</span>' +
           '</div>' +
           '</div>' +
           '<div class="oviz-panel-body">' +
           '<div class="oviz-section-label">Top Collaborators</div>' +
           '<div class="oviz-chips">' + chips + '</div>' +
           roleSection +
           '<div class="oviz-section-label">Responsibilities</div>' +
           '<div class="oviz-tasks">' + taskHTML + '</div>' +
           '</div>';
  }

  /* ─── LEGEND ────────────────────────────────────────────────────────────── */
  function buildLegend() {
    var sorted = D.edges.slice().sort(function (a, b) { return b.weight - a.weight; }).slice(0, 8);

    var pairs = sorted.map(function (e) {
      var cs = C[e.source], ct = C[e.target];
      return '<div class="oviz-pair">' +
             '<span class="oviz-pair-chip" style="background:' + cs.bg + ';color:' + cs.fg + '">' + e.source + '</span>' +
             '<span class="oviz-pair-sep">⟷</span>' +
             '<span class="oviz-pair-chip" style="background:' + ct.bg + ';color:' + ct.fg + '">' + e.target + '</span>' +
             '<span class="oviz-pair-w">' + e.weight + '</span>' +
             '</div>';
    }).join('');

    var depts = Object.keys(D.departments).map(function (code) {
      var c   = C[code];
      var pri = D.departments[code].tasks.filter(function (t) { return t.level === 1; }).length;
      return '<div class="oviz-dept-chip" data-code="' + code +
             '" style="background:' + c.bg + ';border:1px solid ' + c.ac + '22">' +
             '<div class="oviz-dept-code" style="color:' + c.fg + '">' + code + '</div>' +
             '<div class="oviz-dept-count" style="color:' + c.ac + '">' + pri + ' tasks</div>' +
             '</div>';
    }).join('');

    return '<div class="oviz-section-label" style="margin-top:20px">Strongest Collaboration Pairs</div>' +
           '<div class="oviz-pairs-grid">' + pairs + '</div>' +
           '<div class="oviz-section-label" style="margin-top:16px">All Departments</div>' +
           '<div class="oviz-dept-grid">' + depts + '</div>';
  }

  /* ─── RENDER ────────────────────────────────────────────────────────────── */
  function render() {
    var svgEl    = document.getElementById('oviz-svg');
    var panelEl  = document.getElementById('oviz-panel');
    var legendEl = document.getElementById('oviz-legend');
    var labelEl  = document.getElementById('oviz-netlabel');
    var bodyEl   = document.getElementById('oviz-body');
    if (!svgEl) return;

    svgEl.innerHTML = buildSVG();

    if (labelEl) {
      labelEl.textContent = sel
        ? D.departments[sel].name + ' — Collaboration Network'
        : 'Department Network — click a node to explore';
    }

    if (sel) {
      if (panelEl) { panelEl.innerHTML = buildPanel(sel); panelEl.hidden = false; }
      if (legendEl) { legendEl.innerHTML = ''; }
      if (bodyEl) bodyEl.classList.add('oviz-has-sel');
    } else {
      if (panelEl) { panelEl.innerHTML = ''; panelEl.hidden = true; }
      if (legendEl) { legendEl.innerHTML = buildLegend(); }
      if (bodyEl) bodyEl.classList.remove('oviz-has-sel');
    }
  }

  /* ─── SELECT ────────────────────────────────────────────────────────────── */
  function selectNode(code, writeHash) {
    sel = code;
    render();
    if (writeHash !== false) {
      if (code) {
        history.replaceState(null, '', location.pathname + location.search + '#' + code);
      } else {
        history.replaceState(null, '', location.pathname + location.search);
      }
    }
  }

  /* ─── INIT ──────────────────────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    var root = document.getElementById('org-viz-root');
    if (!root) return;

    var total = 0;
    var keys = Object.keys(D.departments);
    keys.forEach(function (k) { total += D.departments[k].tasks.length; });

    root.innerHTML =
      '<div class="oviz-meta">' +
        keys.length + ' departments &nbsp;·&nbsp; ' + total + ' responsibilities &nbsp;·&nbsp; ' + D.edges.length + ' collaboration links' +
      '</div>' +
      '<div id="oviz-netlabel" class="oviz-netlabel">Department Network — click a node to explore</div>' +
      '<div id="oviz-body" class="oviz-body">' +
        '<div class="oviz-net-wrap">' +
          '<svg id="oviz-svg" viewBox="0 0 600 520" style="width:100%;height:auto;display:block"></svg>' +
        '</div>' +
        '<div id="oviz-panel" class="oviz-panel" hidden></div>' +
      '</div>' +
      '<div id="oviz-legend" class="oviz-legend"></div>';

    /* event delegation — SVG node clicks */
    document.getElementById('oviz-svg').addEventListener('click', function (e) {
      var g = e.target.closest('.oviz-node');
      if (g) selectNode(sel === g.getAttribute('data-code') ? null : g.getAttribute('data-code'));
    });

    /* event delegation — panel close button */
    document.getElementById('oviz-panel').addEventListener('click', function (e) {
      if (e.target.closest('.oviz-close-btn')) selectNode(null);
    });

    /* event delegation — legend dept chips */
    document.getElementById('oviz-legend').addEventListener('click', function (e) {
      var chip = e.target.closest('.oviz-dept-chip');
      if (chip) selectNode(chip.getAttribute('data-code'));
    });

    render();

    /* hash-based deep linking */
    var hash = location.hash.slice(1).toUpperCase();
    if (hash && D.departments[hash]) selectNode(hash, false);

    window.addEventListener('hashchange', function () {
      var h = location.hash.slice(1).toUpperCase();
      selectNode(D.departments[h] ? h : null, false);
    });
  });

}());
