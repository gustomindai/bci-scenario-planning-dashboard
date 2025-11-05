import React, { useState, useEffect, useRef } from 'react';
import { Brain, Calendar, Search, Network, Zap, AlertCircle, TrendingUp, Globe, Lightbulb, Target, BarChart3, Shield, ArrowRight, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

const BCIScenarioPlanning = () => {
    const [activeStage, setActiveStage] = useState(-1);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [viewType, setViewType] = useState('list'); // 'list' or 'mindmap'
    const [selectedUncertainty, setSelectedUncertainty] = useState(null);
    const [hoveredDriver, setHoveredDriver] = useState(null);
    const mindmapScrollRef = useRef(null);

    // Reset scroll position when switching to mindmap view
    useEffect(() => {
        if (viewType === 'mindmap' && mindmapScrollRef.current) {
            // Set immediately
            mindmapScrollRef.current.scrollLeft = 0;
            // Also set after a delay to ensure it sticks
            const timer = setTimeout(() => {
                if (mindmapScrollRef.current) {
                    mindmapScrollRef.current.scrollLeft = 0;
                }
            }, 50);
            return () => clearTimeout(timer);
        }
    }, [viewType]);

    // Helper function to convert markdown bold to HTML
    const convertMarkdownToHtml = (text) => {
        if (!text) return '';
        // Replace **text** with <strong>text</strong>
        return text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    };

    // Stage 1: Focal Issue and Horizon
    const focalIssue = {
        question: "In what ways will Brain-Computer Interfaces reshape the future of human work, health, and society by 2035?",
        horizon: 2035,
        justification: [
            "Speed of technological advancement in neurotechnology and AI integration",
            "Typical clinical trial and regulatory approval cycles for medical devices (7-12 years)",
            "Time required for consumer adoption and infrastructure development",
            "Period sufficient for ethical frameworks and governance structures to emerge",
            "Alignment with major tech companies' roadmaps for consumer BCI products"
        ]
    };

    // Stage 2: 40+ PESTLE Uncertainties
    const uncertainties = [
        // POLITICAL (8 factors) - adjusted for dispersion
        { id: 1, category: 'Political', name: 'Global BCI Governance Framework Development', description: 'Whether international bodies establish unified standards for BCI regulation vs. fragmented national approaches', impact: 9, uncertainty: 8.2 },
        { id: 2, category: 'Political', name: 'Government Funding for BCI Research', description: 'The level of public investment in BCI development and whether it prioritizes military vs. civilian applications', impact: 8, uncertainty: 4.8 },
        { id: 3, category: 'Political', name: 'Neural Data Sovereignty Policies', description: 'Whether brain data is classified as biometric data requiring special protection and where it can be stored/processed', impact: 9, uncertainty: 9 },
        { id: 4, category: 'Political', name: 'Military BCI Development and Deployment', description: 'The extent to which military applications drive BCI advancement and potential dual-use implications', impact: 7, uncertainty: 5.7 },
        { id: 5, category: 'Political', name: 'Healthcare System Integration Mandates', description: 'Whether governments mandate BCI integration into national health systems for certain conditions', impact: 8, uncertainty: 5.3 },
        { id: 6, category: 'Political', name: 'Cognitive Enhancement Regulation', description: 'Policy approaches to non-therapeutic cognitive enhancement (ban, regulate, or permit)', impact: 9, uncertainty: 9 },
        { id: 7, category: 'Political', name: 'Cross-Border BCI Data Flow Restrictions', description: 'The degree of restrictions on international transfer of neural data for research and commercial purposes', impact: 7.2, uncertainty: 6.8 },
        { id: 8, category: 'Political', name: 'Public Sector BCI Procurement', description: 'Government adoption of BCI technology for public services and employment', impact: 6, uncertainty: 5.8 },

        // ECONOMIC (7 factors) - adjusted for dispersion
        { id: 9, category: 'Economic', name: 'BCI Market Valuation and Investment', description: 'The scale of venture capital and corporate investment flowing into the BCI sector', impact: 8, uncertainty: 4.7 },
        { id: 10, category: 'Economic', name: 'Insurance Coverage for BCI Therapies', description: 'Whether private and public insurers cover BCI treatments and the extent of coverage', impact: 9, uncertainty: 7.2 },
        { id: 11, category: 'Economic', name: 'Cost Trajectory of BCI Devices', description: 'The speed at which BCI technology becomes affordable for mass-market adoption', impact: 10, uncertainty: 3.8 },
        { id: 12, category: 'Economic', name: 'Labour Market Disruption from Neural Enhancement', description: 'The competitive advantage gained by BCI-enhanced workers and resulting employment dynamics', impact: 9, uncertainty: 9 },
        { id: 13, category: 'Economic', name: 'BCI-Enabled Productivity Gains', description: 'The measurable productivity improvements from BCI use in professional contexts', impact: 8.3, uncertainty: 6.8 },
        { id: 14, category: 'Economic', name: 'Emergence of Neural Data Marketplaces', description: 'Whether commercial markets develop for buying/selling aggregated brain data', impact: 7, uncertainty: 9 },
        { id: 15, category: 'Economic', name: 'BCI Infrastructure Investment', description: 'The level of capital expenditure on neural interface infrastructure and supporting systems', impact: 7.2, uncertainty: 5.8 },

        // SOCIAL (8 factors) - adjusted for dispersion
        { id: 16, category: 'Social', name: 'Public Acceptance of Invasive BCIs', description: 'The willingness of healthy individuals to undergo surgical implantation for enhancement', impact: 10, uncertainty: 9 },
        { id: 17, category: 'Social', name: 'Formation of Cognitive Inequality', description: 'Whether society stratifies into enhanced and non-enhanced classes with different capabilities', impact: 10, uncertainty: 8.3 },
        { id: 18, category: 'Social', name: 'Cultural Attitudes Toward Neural Privacy', description: 'How different cultures and demographics view the sanctity of mental privacy', impact: 9, uncertainty: 7.3 },
        { id: 19, category: 'Social', name: 'BCI Adoption Among Healthcare Professionals', description: 'The rate at which medical professionals recommend and use BCI therapies', impact: 8, uncertainty: 4.6 },
        { id: 20, category: 'Social', name: 'Social Movements for/Against BCIs', description: 'The emergence and influence of advocacy groups either promoting or resisting BCI adoption', impact: 7.3, uncertainty: 6.7 },
        { id: 21, category: 'Social', name: 'Generational Divide in BCI Acceptance', description: 'Whether younger generations embrace BCIs while older generations resist, creating adoption gaps', impact: 8, uncertainty: 5.4 },
        { id: 22, category: 'Social', name: 'BCI Use in Education and Learning', description: 'The integration of BCIs into educational settings for enhanced learning outcomes', impact: 8.2, uncertainty: 7.5 },
        { id: 23, category: 'Social', name: 'Impact on Human Identity and Authenticity', description: 'Philosophical and psychological questions about what makes us "human" with neural augmentation', impact: 9, uncertainty: 8.8 },

        // TECHNOLOGICAL (10 factors) - adjusted for dispersion
        { id: 24, category: 'Technological', name: 'Non-Invasive BCI Performance Breakthrough', description: 'Whether non-invasive BCIs achieve signal quality comparable to invasive implants', impact: 10, uncertainty: 9 },
        { id: 25, category: 'Technological', name: 'BCI-AI Integration Sophistication', description: 'The degree to which artificial intelligence can interpret and predict from brain signals', impact: 9, uncertainty: 6.6 },
        { id: 26, category: 'Technological', name: 'Bidirectional BCI Development', description: 'Progress in not just reading but also writing information directly to the brain', impact: 10, uncertainty: 8.7 },
        { id: 27, category: 'Technological', name: 'Long-Term BCI Safety and Biocompatibility', description: 'Evidence of safety for extended use (10+ years) and resolution of immune response issues', impact: 10, uncertainty: 7.4 },
        { id: 28, category: 'Technological', name: 'Wireless BCI Energy Efficiency', description: 'Battery life and energy requirements for wireless brain implants', impact: 8, uncertainty: 4.8 },
        { id: 29, category: 'Technological', name: 'Cybersecurity of Neural Devices', description: 'The robustness of BCIs against hacking, manipulation, and unauthorized access', impact: 10, uncertainty: 8.2 },
        { id: 30, category: 'Technological', name: 'Multi-Brain Interface Development', description: 'Technology enabling direct brain-to-brain communication between individuals', impact: 8.2, uncertainty: 8.8 },
        { id: 31, category: 'Technological', name: 'BCI Data Compression and Storage', description: 'The efficiency of storing, processing, and transmitting large volumes of neural data', impact: 7, uncertainty: 4.9 },
        { id: 32, category: 'Technological', name: 'Surgical Procedure Simplification', description: 'Whether BCI implantation becomes an outpatient procedure with minimal recovery time', impact: 9, uncertainty: 7.1 },
        { id: 33, category: 'Technological', name: 'BCI Interoperability Standards', description: 'Development of universal protocols allowing different BCI systems to work together', impact: 8, uncertainty: 6.8 },

        // LEGAL (6 factors) - adjusted for dispersion
        { id: 34, category: 'Legal', name: 'Liability Framework for BCI Malfunctions', description: 'Legal clarity on who is responsible when BCIs cause harm (manufacturer, surgeon, user)', impact: 9, uncertainty: 8.9 },
        { id: 35, category: 'Legal', name: 'Neural Data Ownership Rights', description: 'Legal determination of who owns brain data (individual, device maker, or shared)', impact: 10, uncertainty: 9 },
        { id: 36, category: 'Legal', name: 'Admissibility of Brain Data in Court', description: 'Whether neural data can be used as evidence in legal proceedings and under what conditions', impact: 8, uncertainty: 7.8 },
        { id: 37, category: 'Legal', name: 'Employment Discrimination Based on BCI Use', description: 'Legal protections against requiring or discriminating based on BCI enhancement status', impact: 9, uncertainty: 7.2 },
        { id: 38, category: 'Legal', name: 'Intellectual Property for Neural Data', description: 'Patent and IP frameworks for discoveries or creations made using BCIs', impact: 7, uncertainty: 6.9 },
        { id: 39, category: 'Legal', name: 'Right to Cognitive Liberty', description: 'Legal recognition of the right to mental self-determination and freedom from neural manipulation', impact: 9, uncertainty: 8.6 },

        // ENVIRONMENTAL (5 factors) - adjusted for dispersion
        { id: 40, category: 'Environmental', name: 'BCI Electronic Waste Management', description: 'The environmental impact of disposing outdated or removed neural implants', impact: 6, uncertainty: 4.8 },
        { id: 41, category: 'Environmental', name: 'Rare Earth Materials for BCI Manufacturing', description: 'Availability and sustainability of materials needed for advanced neural electrodes', impact: 7, uncertainty: 5.7 },
        { id: 42, category: 'Environmental', name: 'Energy Consumption of BCI Infrastructure', description: 'The carbon footprint of data centers and computing infrastructure supporting BCIs', impact: 6.2, uncertainty: 3.9 },
        { id: 43, category: 'Environmental', name: 'BCI Applications for Environmental Monitoring', description: 'Using enhanced cognition to better understand and respond to ecological challenges', impact: 5, uncertainty: 7.2 },
        { id: 44, category: 'Environmental', name: 'Sustainable BCI Supply Chain', description: 'The extent to which BCI manufacturing adopts circular economy principles', impact: 5.3, uncertainty: 5.8 },

        // CRITICAL PLANNING ISSUES (High Impact, Low Uncertainty) - 5 additional factors
        { id: 45, category: 'Technological', name: 'FDA/Regulatory Approval Process', description: 'The established pathway for medical device approval that BCIs must follow', impact: 9, uncertainty: 3.2 },
        { id: 46, category: 'Economic', name: 'Healthcare Cost Burden of Neurological Disorders', description: 'The known and rising costs of treating conditions like paralysis, depression, and dementia', impact: 9, uncertainty: 2.3 },
        { id: 47, category: 'Social', name: 'Aging Population Demographics', description: 'The predictable increase in elderly populations requiring neurological care', impact: 8, uncertainty: 1.8 },
        { id: 48, category: 'Technological', name: 'Existing Neural Implant Success Rate', description: 'Proven efficacy of current generation BCIs for medical applications (cochlear implants, deep brain stimulation)', impact: 8.5, uncertainty: 3.5 },
        { id: 49, category: 'Political', name: 'Medical Ethics Committee Oversight', description: 'Established institutional review boards and ethics committees that govern medical research', impact: 7.5, uncertainty: 2.5 },
    ];

    // Stage 3: Critical Scenario Drivers (8-12 drivers with highest impact + uncertainty)
    const criticalDrivers = uncertainties
        .map(u => ({ ...u, combinedScore: u.impact + u.uncertainty }))
        .sort((a, b) => b.combinedScore - a.combinedScore)
        .slice(0, 10);

    // Debug: Log to console when component renders
    React.useEffect(() => {
        if (activeStage === 2) {
            console.log('=== MATRIX DEBUG ===');
            console.log('Total uncertainties:', uncertainties.length);
            console.log('Critical drivers:', criticalDrivers.length);
            console.log('Uncertainties array:', uncertainties);
            console.log('Critical driver IDs:', criticalDrivers.map(d => d.id));
        }
    }, [activeStage]);

    // Stage 4: Driver Connections (enhanced mapping relationships)
    const driverConnections = [
        // Core acceptance cluster
        { from: 24, to: 16, type: 'cause', description: 'Non-invasive breakthrough increases public acceptance' },
        { from: 11, to: 16, type: 'cause', description: 'Lower costs drive wider acceptance' },
        { from: 16, to: 17, type: 'feedback', description: 'Acceptance patterns create or prevent inequality' },
        { from: 29, to: 16, type: 'cause', description: 'Security concerns impact acceptance' },
        { from: 34, to: 16, type: 'cause', description: 'Legal clarity on liability affects adoption confidence' },

        // Inequality and labour impacts
        { from: 17, to: 12, type: 'feedback', description: 'Cognitive inequality affects labour markets' },
        { from: 6, to: 17, type: 'cause', description: 'Enhancement regulations shape inequality outcomes' },
        { from: 12, to: 17, type: 'feedback', description: 'Labour disruption reinforces inequality patterns' },

        // Data governance cluster
        { from: 35, to: 3, type: 'cause', description: 'Ownership rights influence sovereignty policies' },
        { from: 3, to: 6, type: 'feedback', description: 'Sovereignty policies shape enhancement regulations' },
        { from: 35, to: 6, type: 'cause', description: 'Data ownership rights affect enhancement policy frameworks' },
        { from: 29, to: 35, type: 'feedback', description: 'Security vulnerabilities influence data ownership debates' },

        // Identity and ethics
        { from: 26, to: 23, type: 'cause', description: 'Bidirectional BCIs raise identity questions' },
        { from: 23, to: 6, type: 'feedback', description: 'Identity concerns influence enhancement policy' },
        { from: 23, to: 16, type: 'feedback', description: 'Identity anxieties affect public acceptance' },

        // Economic and safety foundations
        { from: 27, to: 10, type: 'cause', description: 'Safety evidence drives insurance coverage' },
        { from: 10, to: 11, type: 'feedback', description: 'Insurance coverage affects cost dynamics' },
        { from: 11, to: 17, type: 'cause', description: 'Lower costs enable wider adoption, potentially increasing inequality' },

        // Technology enabling connections
        { from: 25, to: 13, type: 'cause', description: 'Better AI integration enables productivity gains' },
        { from: 13, to: 12, type: 'feedback', description: 'Productivity gains reshape labour markets' },
        { from: 24, to: 29, type: 'feedback', description: 'Non-invasive tech faces different security challenges' },
        { from: 26, to: 29, type: 'feedback', description: 'Bidirectional systems create heightened security risks' },

        // Regulatory feedback loops
        { from: 34, to: 27, type: 'feedback', description: 'Liability frameworks depend on safety track records' },
        { from: 6, to: 34, type: 'feedback', description: 'Enhancement policies shape liability interpretations' },
    ];

    const pestleColors = {
        'Political': 'bg-purple-700',
        'Economic': 'bg-blue-700',
        'Social': 'bg-pink-700',
        'Legal': 'bg-yellow-700',           // Swapped: Legal now in position 3 (bottom)
        'Technological': 'bg-green-700',    // Swapped: Technological now in position 4 (lower left)
        'Environmental': 'bg-teal-700'
    };

    const pestleFactorColors = {
        'Political': 'bg-purple-500',
        'Economic': 'bg-blue-500',
        'Social': 'bg-pink-500',
        'Legal': 'bg-yellow-500',           // Swapped: Legal now in position 3 (bottom)
        'Technological': 'bg-green-500',    // Swapped: Technological now in position 4 (lower left)
        'Environmental': 'bg-teal-500'
    };

    // ===== MIND MAP LAYOUT CONFIGURATION =====
    // Adjust these values for each category to control positioning
    // categoryRadius: Distance from CENTER to the category node (in pixels) - move the main category box
    // subRadius: Distance from category node to its factors (in pixels)
    // angularSpread: How wide the factors spread around the category (higher = wider arc)
    const mindMapConfig = {
        // POLITICAL (9 factors) - Top of circle (position 0)
        'Political': {
            categoryRadius: 300,   // Adjust this to move Political category box closer/further from CENTER
            subRadius: 250,        // Adjust this to move factors closer/further from Political category
            angularSpread: 0.38    // Adjust this to make factors more/less spread out
        },
        // ECONOMIC (8 factors) - Upper right (position 1)
        'Economic': {
            categoryRadius: 400,   // Adjust this to move Economic category box closer/further from CENTER
            subRadius: 350,        // Adjust this to move factors closer/further from Economic category
            angularSpread: 0.28    // Adjust this to make factors more/less spread out
        },
        // SOCIAL (9 factors) - Lower right (position 2)
        'Social': {
            categoryRadius: 400,   // Adjust this to move Social category box closer/further from CENTER
            subRadius: 300,        // Adjust this to move factors closer/further from Social category
            angularSpread: 0.25    // Adjust this to make factors more/less spread out
        },
        // LEGAL (6 factors) - Bottom (position 3) - SWAPPED WITH TECHNOLOGICAL for better spacing
        'Legal': {
            categoryRadius: 250,   // Adjust this to move Legal category box closer/further from CENTER
            subRadius: 225,        // Adjust this to move factors closer/further from Legal category
            angularSpread: 0.5    // Adjust this to make factors more/less spread out
        },
        // TECHNOLOGICAL (12 factors) - Lower left (position 4) - SWAPPED WITH LEGAL for better spacing
        'Technological': {
            categoryRadius: 500,   // Adjust this to move Technological category box closer/further from CENTER
            subRadius: 280,        // Adjust this to move factors closer/further from Technological category
            angularSpread: 0.27    // Adjust this to make factors more/less spread out (tighter due to 12 factors)
        },
        // ENVIRONMENTAL (5 factors) - Upper left (position 5)
        'Environmental': {
            categoryRadius: 400,   // Adjust this to move Environmental category box closer/further from CENTER
            subRadius: 300,        // Adjust this to move factors closer/further from Environmental category
            angularSpread: 0.35    // Adjust this to make factors more/less spread out
        }
    };
    // ===== END MIND MAP CONFIGURATION =====

    // Stage 5: Chosen Scenario Axes (Linchpin Factors)
    const chosenAxes = {
        axis1: {
            id: 16,
            name: 'Public Acceptance of Invasive BCIs',
            category: 'Social',
            dimension: 'Future of Public Acceptance',
            lowExtreme: 'Deep Skepticism & Resistance',
            highExtreme: 'Widespread Embrace & Normalization',
            description: 'The willingness of healthy individuals to undergo surgical implantation for enhancement'
        },
        axis2: {
            id: 24,
            name: 'Non-Invasive BCI Performance Breakthrough',
            category: 'Technological',
            dimension: 'Pace of Non-Invasive BCI Breakthroughs',
            lowExtreme: 'Incremental Progress',
            highExtreme: 'Rapid, Exponential Advances',
            description: 'Whether non-invasive BCIs achieve signal quality comparable to invasive implants'
        }
    };

    // Stage 6: The Four Scenario Narratives
    const scenarios = {
        scenario1: {
            name: 'The Hesitant Dawn',
            position: 'Low Acceptance + Low Tech Progress',
            quadrant: 'bottom-left',
            tagline: 'When society and science move slowly together',
            primaryFactors: ['Public Acceptance (Low)', 'Non-Invasive Tech Progress (Low)'],
            secondaryFactors: ['Stringent FDA Regulations', 'High Healthcare Costs', 'Medical Insurance Skepticism'],
            narrativeType: 'Newspaper Headlines',
            year: 2035,
            headlines: [
                { outlet: 'The Medical Times', date: 'January 2035', text: 'BCI Market Grows 3% Annually - Analysts Call It "Steady But Uninspiring"' },
                { outlet: 'TechWatch Daily', date: 'March 2035', text: 'Non-Invasive BCIs Still Lag Behind Expectations After Decade of Incremental Gains' },
                { outlet: 'Public Health Journal', date: 'June 2035', text: '78% of Americans Remain Opposed to Elective Brain Implants, Poll Finds' },
                { outlet: 'Regulatory Review', date: 'September 2035', text: 'FDA Maintains Cautious Stance on BCI Enhancement Applications' }
            ],
            worldDescription: 'By 2035, BCIs remain primarily within the medical domain, treating paralysis and severe neurological conditions. Public skepticism, fueled by persistent concerns about mental privacy and surgical risks, has prevented mainstream adoption. Non-invasive technologies have advanced, but only incrementally - the "signal quality gap" between invasive and non-invasive devices remains significant. Insurance companies classify enhancement BCIs as elective procedures, making them inaccessible to most. The aging Boomer generation, initially expected to drive demand, has proven more risk-averse than anticipated.',
            keyStatistics: [
                '~450,000 BCI users globally (0.006% of population)',
                '92% of BCIs used for medical restoration, not enhancement',
                '$8.2B total market size (vs. 2025 predictions of $45B)',
                'Average non-invasive BCI: 40 channels, 2kHz sampling (modest gains from 2025)',
                'Average cost of invasive BCI procedure: $185,000 (largely unchanged)'
            ],
            expectedTrends: [
                'Aging demographics create growing need for medical BCIs for Alzheimer\'s and Parkinson\'s treatment',
                'Healthcare costs continue to rise, limiting accessibility',
                'Generative AI has matured but hasn\'t driven BCI demand as predicted',
                'Regulatory approval cycles remain lengthy (8-12 years for new devices)'
            ]
        },
        scenario2: {
            name: 'The Forbidden Frontier',
            position: 'Low Acceptance + High Tech Progress',
            quadrant: 'bottom-right',
            tagline: 'When technology outraces societal acceptance',
            primaryFactors: ['Public Acceptance (Low)', 'Non-Invasive Tech Progress (High)'],
            secondaryFactors: ['Regulatory Fragmentation', 'Ethical Divide', 'Corporate Frustration'],
            narrativeType: 'Social Media Thread',
            year: 2035,
            thread: [
                { user: '@TechEthicist_Maya', handle: 'Dr. Maya Chen', timestamp: 'Nov 3, 2035', text: '🧠 THREAD: The BCI paradox of 2035 - we have the tech to read and write complex thoughts non-invasively, but society has drawn a hard line. And honestly? Maybe that\'s not a bad thing. 1/12', likes: '47.2K', retweets: '18.9K' },
                { user: '@TechEthicist_Maya', handle: 'Dr. Maya Chen', timestamp: 'Nov 3, 2035', text: '2/ Non-invasive BCIs now match invasive signal quality (200+ channels, 10kHz sampling). The breakthrough came from quantum sensors + AI-driven noise filtering. The tech is REAL.', likes: '38.1K', retweets: '12.4K' },
                { user: '@TechEthicist_Maya', handle: 'Dr. Maya Chen', timestamp: 'Nov 3, 2035', text: '3/ But here\'s what Silicon Valley didn\'t predict: people are TERRIFIED. Not of surgery - we solved that. They\'re terrified of thought surveillance, manipulation, and losing agency. Privacy isn\'t dead, it\'s become sacred.', likes: '52.3K', retweets: '19.7K' },
                { user: '@TechEthicist_Maya', handle: 'Dr. Maya Chen', timestamp: 'Nov 3, 2035', text: '4/ EU has banned enhancement BCIs outright. US has a patchwork - 23 states prohibit it, 15 allow with restrictions, 12 still debating. China leads in medical BCIs but enhancement is state-controlled only.', likes: '31.8K', retweets: '11.2K' },
                { user: '@TechEthicist_Maya', handle: 'Dr. Maya Chen', timestamp: 'Nov 3, 2035', text: '5/ Meanwhile, a gray market is booming. "Neural tourism" to Singapore, Dubai, and parts of South America. Estimated 2M people have gotten enhancement BCIs offshore. No regulation = no safety net.', likes: '43.7K', retweets: '16.8K' },
                { user: '@TechEthicist_Maya', handle: 'Dr. Maya Chen', timestamp: 'Nov 3, 2035', text: '12/ The question isn\'t "can we?" anymore. It\'s "should we?" And in 2035, society is saying "not yet." Tech companies are furious. But maybe, just maybe, pumping the brakes is exactly what responsible innovation looks like. END🧵', likes: '89.4K', retweets: '34.2K' }
            ],
            worldDescription: 'By 2035, non-invasive BCI technology has achieved a stunning breakthrough. Quantum-enhanced sensors combined with AI-driven signal processing have closed the performance gap with invasive devices. Yet this technological triumph has collided with a societal wall of resistance. The 2028-2031 "Mental Privacy Wars" - a series of high-profile cases involving BCI data breaches and alleged thought surveillance - have made the public deeply skeptical. Regulatory fragmentation has created a fractured global landscape, with some regions banning enhancement BCIs entirely while others have created offshore havens. The result is a strange paradox: the technology exists, but it remains forbidden fruit for most of the world.',
            keyStatistics: [
                '~2.8M BCI users globally, but 2M obtained devices through "neural tourism"',
                'Non-invasive BCIs now achieve 200+ channels, 10kHz sampling (10x improvement)',
                '$78B in BCI R&D investment (2025-2035), but only $12B market size',
                'EU: Complete ban on enhancement BCIs since 2032',
                'Singapore, Dubai, São Paulo: "BCI haven" cities with $4.2B medical tourism industry'
            ],
            expectedTrends: [
                'Aging demographics create medical demand, but regulators remain cautious on enhancement',
                'Healthcare costs remain high; insurance doesn\'t cover offshore procedures',
                'Generative AI maturity enables powerful BCI applications - which amplifies fears',
                'Global regulatory fragmentation creates compliance nightmares for companies'
            ]
        },
        scenario3: {
            name: 'The Waiting World',
            position: 'High Acceptance + Low Tech Progress',
            quadrant: 'top-left',
            tagline: 'When society is ready but technology lags behind',
            primaryFactors: ['Public Acceptance (High)', 'Non-Invasive Tech Progress (Low)'],
            secondaryFactors: ['Normalized Invasive Procedures', 'Pent-Up Demand', 'Premium Pricing'],
            narrativeType: 'CEO Memo',
            year: 2035,
            memo: {
                from: 'Sarah Okonkwo, CEO, NeuroLink Global',
                to: 'Board of Directors & Executive Leadership',
                date: 'October 15, 2035',
                subject: 'Q3 2035 Strategic Update: Navigating the Demand-Supply Paradox',
                body: `Dear Board Members and Executive Team,

I'm writing to provide context on our Q3 results and the strategic inflection point we're facing.

**The Good News: Demand Has Never Been Stronger**

Public acceptance of BCIs has exceeded our most optimistic projections. The normalization of elective neural enhancement—once considered science fiction—is now mainstream:

• **64% of Americans aged 25-45** report they would "definitely or probably" get a BCI for cognitive enhancement
• Our waitlist has grown to **2.3 million people** (**18-month average wait time**)
• Premium willingness-to-pay remains high: **$85K average** for our Gen-4 invasive implant
• Insurance coverage expanded in 2033-34, with **40% of procedures now partially reimbursed**

The cultural shift has been remarkable. What changed? First, the 2029-2032 mental health crisis made brain interventions less stigmatized. Second, a generation that grew up with smartphones sees neural interfaces as a natural next step. Third, early adopters—particularly in high-stakes fields like surgery and aviation—have demonstrated clear, measurable benefits.

**The Challenge: Technology Hasn't Kept Pace**

Here's our strategic dilemma: Non-invasive BCIs have advanced only incrementally. After a decade of effort, our flagship non-invasive headset still delivers just **45 channels at 2.5kHz**—far short of the **200+ channels needed** for seamless thought-to-text or immersive AR experiences.

This means the only path to premium BCI performance remains invasive implantation. And while society has accepted this, it creates bottlenecks:

• Surgical capacity constraints: **Only 3,200 certified BCI neurosurgeons globally**
• Procedure complexity: **6-8 hour surgery + 3-month recovery period**
• Scaling challenge: We can only perform **125,000 procedures annually** (vs. **2M+ in demand**)

**The Market Implications**

We're operating in a "waiting world"—**massive demand, constrained supply, premium pricing**. Our average selling price has increased **35% since 2030**, and margins are strong. But we're leaving billions on the table and creating frustration.

Competitors are pursuing two strategies:
1. Scale surgical capacity (but limited by surgeon training pipeline)
2. "Good enough" non-invasive devices for mass market (but performance gap remains wide)

**Strategic Priorities for 2036**

1. **Surgical Capacity Expansion**: Partner with leading medical schools to **double certified surgeons by 2038**
2. **Simplify Procedures**: Invest in robotic-assisted surgery to **reduce procedure time to 3-4 hours**
3. **Incremental Non-Invasive Gains**: Continue R&D, but don't expect breakthroughs—this is a **gradual climb**
4. **Manage Expectations**: **Transparent communication** about wait times and realistic timelines

**The Bottom Line**

We're in a unique position—the world wants what we have, but we can't make it fast enough. This is a high-class problem, but a real one. Our strategic imperative is to scale responsibly, maintain quality, and continue advancing the science.

The future of BCIs is bright. We just need to build it one implant at a time.

Best regards,
**Sarah Okonkwo**
CEO, NeuroLink Global`
            },
            worldDescription: 'By 2035, society has embraced BCIs with surprising enthusiasm. Early fears about mental privacy and identity have largely dissipated, driven by a mental health crisis in the late 2020s that normalized brain interventions and a generation comfortable with invasive tech. But non-invasive technology has disappointed. Despite billions in R&D, the "signal quality gap" persists. The only path to high-performance BCIs remains surgical implantation—now socially acceptable, but limited by surgical capacity, cost, and recovery time. The result is pent-up demand: millions want BCIs, but supply constraints keep the market exclusive. Companies face a strange challenge: too much demand, not enough supply. Premium pricing prevails, but the mass market opportunity remains untapped.',
            keyStatistics: [
                '~1.2M BCI users globally (supply-constrained, not demand-constrained)',
                'Estimated 5-7M people on waitlists for BCI procedures globally',
                'Average invasive BCI cost: $85,000 (up 35% from 2030 due to demand)',
                'Non-invasive BCIs remain at ~45 channels, 2.5kHz (modest improvement)',
                'Only 3,200 certified BCI neurosurgeons worldwide (up from 800 in 2025)'
            ],
            expectedTrends: [
                'Aging demographics normalize medical procedures, reducing stigma of brain surgery',
                'Healthcare costs rise, but insurance coverage expands as BCIs prove ROI',
                'Generative AI creates powerful BCI applications, driving consumer interest',
                'FDA approvals accelerate as safety data accumulates, but surgical bottleneck remains'
            ]
        },
        scenario4: {
            name: 'The Augmented Age',
            position: 'High Acceptance + High Tech Progress',
            quadrant: 'top-right',
            tagline: 'When technology and society advance in harmony',
            primaryFactors: ['Public Acceptance (High)', 'Non-Invasive Tech Progress (High)'],
            secondaryFactors: ['Mainstream Adoption', 'Ethical Frameworks Established', 'New Social Norms'],
            narrativeType: 'Day in the Life',
            year: 2035,
            character: {
                name: 'Alex Rivera',
                age: 34,
                profession: 'Senior Product Designer',
                location: 'Austin, Texas',
                bciType: 'NeuroLink Horizon X3 (Non-Invasive, Consumer Model)'
            },
            narrative: `**6:47 AM – Morning Routine**

Alex doesn't hear the alarm. The BCI **detects the optimal wake point** in their sleep cycle and gently elevates cortisol levels, bringing them from deep sleep to wakefulness over five minutes. No jarring sound. Just a **natural transition**.

While brushing teeth, Alex **mentally scrolls** through overnight messages. A quick **thought-command** archives work emails and flags two urgent items. The **BCI's AR overlay** highlights calendar conflicts—three meetings overlap today. Alex **subvocalizes** a note to their assistant AI: "Reschedule the 2 PM, priority to the client call."

**7:15 AM – Commute**

On the autonomous bus, Alex slips into **"flow state."** The BCI recognizes the intention to work and **optimizes their neural activity**—increasing focus, reducing distractions. They're designing a new app interface, but instead of fumbling with a tablet, Alex simply ***thinks* through iterations**. The BCI captures intent, the AI renders options, and Alex **navigates by attention alone**.

**Twenty minutes of commute = ninety minutes of traditional productivity.**

Other passengers are in their own worlds. Some watching entertainment (**streamed directly to visual cortex—no screen needed**). Others in virtual meetings, their avatars speaking in real-time based on **subvocalized thought**. An older man with a medical-grade BCI appears to be **writing an email while reading a book simultaneously**. Different neural channels, different tasks.

**9:30 AM – Team Collaboration**

The morning standup is a hybrid experience. Three teammates are physically present, four are remote but feel present. Their BCIs enable **"ambient awareness"**—Alex can **sense their emotional state and attention level** without explicit communication. When Jamie (in Singapore) grows confused during a technical explanation, Alex feels a **subtle cognitive dissonance through the shared neural network** and pauses to clarify.

The team navigates a complex 3D design model using **collective thought**. Each person's attention directs different elements. It's like **six hands sculpting the same clay, but the clay is made of light and thought**.

**12:45 PM – Lunch & The Cognitive Gym**

Alex meets a friend at a café that offers "neural wellness sessions." While eating, they each wear neural stimulation bands—non-invasive BCIs that deliver targeted brain stimulation. Today's session: memory consolidation and creative ideation boost.

The conversation drifts to a friend's recent "upgrade"—she got the latest invasive implant for professional gaming. "Is it worth the surgery?" Alex wonders aloud. "For her career, yeah. For most people? **Non-invasive is good enough now**."

That's the consensus in 2035. Invasive BCIs offer marginal performance gains (**~15-20%**), but for **90% of use cases, non-invasive tech delivers**. The surgery is only for elites: surgeons, pilots, professional gamers, deep-focus researchers.

**3:00 PM – Deep Work**

Back home, Alex enters **"monk mode."** The BCI detects the intention and activates a **deep focus protocol**: external stimuli muted, dopamine regulation engaged, **time perception slightly dilated**. They're designing a complex interaction system, and the BCI acts as a **cognitive scaffold**—holding multiple concepts in working memory simultaneously, preventing attention drift.

**Two hours pass. It feels like 45 minutes. The work would have taken six hours in 2025.**

**6:30 PM – Family Time**

Alex's BCI automatically shifts to **"social mode"**—enhancing emotional attunement, reducing work-related background processing. Dinner with their partner and two kids (ages 6 and 9) is **BCI-free by house rule**. The kids' school allows BCIs **only for accessibility, not enhancement**. That's the norm now.

After dinner, Alex's partner (a teacher) mentions a debate at school. Some parents want BCIs for "learning acceleration." Others worry about **"neural inequality"**—kids whose families can't afford premium BCIs falling behind. **It's the biggest social question of the 2030s.**

**9:15 PM – Evening Wind-Down**

Before bed, Alex uses a meditation app designed for BCIs. It doesn't just play calming sounds—it **directly modulates their neural rhythms**, guiding them from beta waves (alertness) to alpha (relaxation) to theta (deep meditation). **Ten minutes of BCI meditation = sixty minutes of traditional practice.**

As they drift to sleep, Alex reflects on the strangeness of it all. A decade ago, **BCIs were science fiction**. Now? **They're as normal as smartphones were in 2020**. Some people worry about the loss of "natural" cognition. But to Alex, it feels like **humans finally have the tools to think at the speed they were always meant to**.

The BCI detects the onset of sleep and powers down to minimal monitoring. Tomorrow, it begins again.

**Welcome to the Augmented Age.**`,
            worldDescription: 'By 2035, BCIs have become woven into the fabric of daily life—not for everyone, but for a substantial and growing segment of society. The breakthrough came on two fronts: non-invasive technology achieved the long-sought "signal quality parity" with invasive devices (good enough for 90% of use cases), and society overcame its fears through a combination of positive early experiences, clear ethical guidelines, and cultural normalization. BCIs are now in the "smartphone phase"—mass adoption is underway, social norms are forming, and a digital divide is emerging between the augmented and unaugmented. Most people use non-invasive devices for productivity, entertainment, and wellness. Invasive implants remain a premium option for professionals requiring maximum performance. The world feels simultaneously futuristic and familiar—BCIs are everywhere, yet life goes on.',
            keyStatistics: [
                '~280M BCI users globally (~3.5% of population, concentrated in developed nations)',
                '92% use non-invasive devices; 8% have invasive implants',
                '$340B total BCI market size (hardware, software, services)',
                'Non-invasive BCIs: 200+ channels, 10kHz sampling (breakthrough achieved 2031-2033)',
                'Average consumer non-invasive BCI: $1,200-$3,500 (smartphone price range)'
            ],
            expectedTrends: [
                'Aging demographics drive demand for cognitive enhancement and Alzheimer\'s intervention',
                'Healthcare costs rise, but BCIs prove cost-effective for mental health treatment',
                'Generative AI + BCIs create powerful symbiosis (thought-to-creation workflows)',
                'FDA approvals streamlined after 2029 regulatory reform; global harmonization by 2033'
            ]
        }
    };

    const stages = [
        { id: -1, title: 'Introduction', icon: Lightbulb, isIntro: true },
        { id: 0, title: 'Focal Issue & Horizon', icon: Calendar },
        { id: 1, title: 'Scanning for Signals', icon: Search },
        { id: 2, title: 'Impact-Uncertainty Matrix', icon: TrendingUp },
        { id: 3, title: 'Mapping Connections', icon: Network },
        { id: 4, title: 'Choosing the Axes', icon: Zap },
        { id: 5, title: 'Scenario Narratives', icon: Globe },
        { id: 6, title: 'Impact Assessment', icon: Target },
        { id: 7, title: 'Strategic Preparedness', icon: BarChart3 }
    ];

    // Filter uncertainties by category
    const filteredUncertainties = selectedCategory === 'all'
        ? uncertainties
        : uncertainties.filter(u => u.category === selectedCategory);

    const categoryCounts = {
        'Political': uncertainties.filter(u => u.category === 'Political').length,
        'Economic': uncertainties.filter(u => u.category === 'Economic').length,
        'Social': uncertainties.filter(u => u.category === 'Social').length,
        'Technological': uncertainties.filter(u => u.category === 'Technological').length,
        'Legal': uncertainties.filter(u => u.category === 'Legal').length,
        'Environmental': uncertainties.filter(u => u.category === 'Environmental').length,
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white p-8">
            <div className={`mx-auto ${viewType === 'mindmap' && activeStage === 1 ? 'max-w-none' : 'max-w-7xl'}`}>
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex justify-center items-center gap-3 mb-4">
                        <Brain className="w-12 h-12 text-pink-400" />
                        <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                            BCI Scenario Planning
                        </h1>
                    </div>
                    <p className="text-xl text-purple-200 max-w-3xl mx-auto">
                        Interactive Demonstration: Mapping the Uncertain Future of Brain-Computer Interfaces to 2035
                    </p>
                </div>

                {/* Stage Navigation */}
                <div className="flex justify-center gap-4 mb-12 flex-wrap">
                    {stages.map((stage) => {
                        const Icon = stage.icon;
                        return (
                            <button
                                key={stage.id}
                                onClick={() => setActiveStage(stage.id)}
                                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${activeStage === stage.id
                                    ? 'bg-white text-purple-900 shadow-lg scale-105'
                                    : 'bg-purple-800/50 hover:bg-purple-700/50'
                                    }`}
                            >
                                <Icon className="w-5 h-5" />
                                <span>{stage.isIntro ? '📘 ' : `Stage ${stage.id + 1}: `}{stage.title}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Stage Content */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl">
                    {/* Dashboard Introduction: Dashboard Introduction */}
                    {activeStage === -1 && (
                        <div className="space-y-8">
                            <div className="text-center mb-8">
                                <h2 className="text-4xl font-bold mb-4 text-yellow-300">Welcome to the BCI Foresight Engine</h2>
                                <p className="text-xl text-purple-200 mb-4">An Interactive Demonstration of Strategic Scenario Planning Methodology</p>
                                <div className="bg-purple-900/40 px-6 py-3 rounded-xl border border-purple-400/30 inline-block">
                                    <p className="text-purple-200 text-sm">
                                        <span className="font-semibold text-purple-100">Dashboard created by:</span> Dr. Bruno Oliveira with AI assistance<br />
                                        <span className="italic text-purple-300">Comprehensive pedagogical demonstration of scenario planning methodology in practice</span>
                                    </p>
                                </div>
                            </div>

                            {/* Critical Framing: Exemplar vs Template */}
                            <div className="bg-gradient-to-r from-red-600/30 to-orange-600/30 p-8 rounded-xl border-4 border-red-400/70">
                                <div className="flex items-start gap-4 mb-4">
                                    <AlertTriangle className="w-12 h-12 text-red-300 flex-shrink-0" />
                                    <div>
                                        <h3 className="text-2xl font-bold text-red-200 mb-3">IMPORTANT: This is an EXEMPLAR, Not a Template</h3>
                                        <div className="space-y-3 text-red-100">
                                            <p className="text-lg leading-relaxed">
                                                <span className="font-bold text-red-200">This dashboard demonstrates the LOGIC of scenario planning, not the SCALE you must achieve.</span> It is intentionally comprehensive to show you what professional-grade scenario planning looks like in practice.
                                            </p>
                                            <p className="text-lg leading-relaxed">
                                                <span className="font-bold text-yellow-300">Your project does NOT require:</span>
                                            </p>
                                            <ul className="list-disc list-inside space-y-2 ml-4 text-lg">
                                                <li>49 PESTLE factors (40 are sufficient to ensure diversity)</li>
                                                <li>Interactive visualizations or dashboards</li>
                                                <li>This level of exhaustive detail</li>
                                                <li>Multiple hover explanations or tooltips</li>
                                            </ul>
                                            <p className="text-lg leading-relaxed mt-4">
                                                <span className="font-bold text-yellow-300">What you SHOULD focus on:</span> Understanding the <span className="font-semibold">strategic thinking process</span>—how we move from uncertainty to strategic insight. Pay attention to <span className="font-semibold">WHY</span> decisions are made at each stage, not just <span className="font-semibold">WHAT</span> is presented.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* The Company: NeuraForge X */}
                            <div className="bg-gradient-to-r from-cyan-600/30 to-blue-600/30 p-8 rounded-xl border-2 border-cyan-400">
                                <h3 className="text-2xl font-bold mb-4 text-cyan-200 flex items-center gap-3">
                                    <Brain className="w-8 h-8" />
                                    The Company: NeuraForge X
                                </h3>
                                <p className="text-xl italic text-cyan-100 mb-6">"Forging the Future of Human Intelligence"</p>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="font-bold text-cyan-200 mb-2">Company Identity</h4>
                                            <p className="text-cyan-50 text-sm leading-relaxed">
                                                Founded in 2019 by neuroscientists and AI researchers from MIT/Stanford, NeuraForge X pioneers the merger of human cognition with artificial intelligence to unlock humanity's next evolutionary leap.
                                            </p>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-cyan-200 mb-2">Vision</h4>
                                            <p className="text-cyan-50 text-sm leading-relaxed">
                                                A future where BCIs enable direct human-AI symbiosis, cognitive enhancement, memory augmentation, and seamless digital integration.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="font-bold text-cyan-200 mb-2">Current Business Mix</h4>
                                            <ul className="text-cyan-50 text-sm space-y-2">
                                                <li><span className="font-semibold text-green-300">70% revenue:</span> Medical BCI Division—FDA-approved invasive BCIs for paralysis, ALS, neurological conditions</li>
                                                <li><span className="font-semibold text-yellow-300">20% revenue:</span> Cognitive Enhancement Lab—Non-invasive BCIs for focus, memory, learning</li>
                                                <li><span className="font-semibold text-blue-300">10% revenue:</span> AI-Brain Integration—Experimental brain-to-AI interfaces</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6 mt-6">
                                    <div className="bg-green-900/30 p-4 rounded-lg">
                                        <h4 className="font-bold text-green-300 mb-3 flex items-center gap-2">
                                            <CheckCircle className="w-5 h-5" />
                                            Current Strengths
                                        </h4>
                                        <ul className="text-green-100 text-sm space-y-1.5">
                                            <li>• FDA regulatory mastery (medical heritage)</li>
                                            <li>• Elite neurosurgeon partnerships</li>
                                            <li>• Pioneering neurotech IP portfolio</li>
                                            <li>• Clinical credibility and research pedigree</li>
                                        </ul>
                                    </div>
                                    <div className="bg-red-900/30 p-4 rounded-lg">
                                        <h4 className="font-bold text-red-300 mb-3 flex items-center gap-2">
                                            <XCircle className="w-5 h-5" />
                                            Current Gaps
                                        </h4>
                                        <ul className="text-red-100 text-sm space-y-1.5">
                                            <li>• Limited consumer brand/marketing capabilities</li>
                                            <li>• Moderate AI/ML capabilities vs tech giants</li>
                                            <li>• Structure optimized for compliance, not speed</li>
                                            <li>• No mass manufacturing infrastructure</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="bg-purple-900/40 p-5 rounded-lg mt-6 border-2 border-purple-400/40">
                                    <h4 className="font-bold text-purple-200 mb-3 flex items-center gap-2">
                                        <Target className="w-6 h-6" />
                                        Strategic Dilemma
                                    </h4>
                                    <p className="text-purple-100 italic leading-relaxed">
                                        "We stand at a crossroads. Our medical BCI business is profitable and growing, but our vision is the cognitive enhancement future. Which world are we building for? The cautious medical path? The Wild West offshore markets? The supply-constrained premium market? Or the mass consumer augmentation revolution? <span className="font-bold text-yellow-300">We need a strategy that prepares us for multiple futures.</span>"
                                    </p>
                                </div>

                                <div className="bg-orange-900/40 p-4 rounded-lg mt-6 border-2 border-orange-400/60">
                                    <p className="text-orange-100 text-sm text-center">
                                        <span className="font-bold text-orange-200">⚠️ Important:</span> NeuraForge X is a <span className="font-semibold">fictional company created for illustration purposes only</span>. The company profile, capabilities, and strategic challenges are designed to demonstrate how scenario planning methodology applies in practice.
                                    </p>
                                </div>
                            </div>

                            {/* Why BCI Topic? */}
                            <div className="bg-gradient-to-r from-purple-600/30 to-pink-600/30 p-8 rounded-xl border-2 border-purple-400">
                                <h3 className="text-2xl font-bold mb-4 text-purple-200">Why Brain-Computer Interfaces for This Demonstration?</h3>
                                <div className="space-y-4 text-purple-100">
                                    <p className="leading-relaxed">
                                        <span className="font-semibold text-purple-200">BCI technology is the perfect case study</span> for demonstrating scenario planning methodology because it sits at the <span className="font-semibold text-yellow-300">intersection of extreme uncertainty and high strategic stakes</span>.
                                    </p>
                                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                                        <div className="bg-black/20 p-4 rounded-lg">
                                            <h4 className="font-bold text-purple-200 mb-2">High Uncertainty</h4>
                                            <ul className="text-sm space-y-1">
                                                <li>• Technology advancement speed unknown</li>
                                                <li>• Regulatory paths unclear globally</li>
                                                <li>• Social acceptance highly unpredictable</li>
                                                <li>• Competitive landscape rapidly shifting</li>
                                            </ul>
                                        </div>
                                        <div className="bg-black/20 p-4 rounded-lg">
                                            <h4 className="font-bold text-purple-200 mb-2">Strategic Importance</h4>
                                            <ul className="text-sm space-y-1">
                                                <li>• Could redefine human-machine interaction</li>
                                                <li>• Massive market potential (medical + enhancement)</li>
                                                <li>• Long-term investment commitments required</li>
                                                <li>• "Winner-take-all" platform dynamics possible</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <p className="leading-relaxed mt-4">
                                        This is precisely the type of <span className="font-semibold text-yellow-300">emergent, cutting-edge domain</span> where scenario planning provides maximum strategic value—when the future could unfold in radically different directions.
                                    </p>
                                </div>
                            </div>

                            {/* How to Use This Dashboard */}
                            <div className="bg-gradient-to-r from-indigo-600/30 to-blue-600/30 p-8 rounded-xl border-2 border-indigo-400">
                                <h3 className="text-2xl font-bold mb-4 text-indigo-200 flex items-center gap-3">
                                    <Lightbulb className="w-7 h-7" />
                                    How to Navigate This Dashboard
                                </h3>
                                <div className="space-y-4 text-indigo-100">
                                    <p className="text-lg font-semibold text-indigo-200">
                                        This tool demonstrates the 8-stage scenario planning process we covered in lectures. Here's how to get maximum learning value:
                                    </p>
                                    <div className="grid md:grid-cols-2 gap-6 mt-4">
                                        <div className="space-y-3">
                                            <div className="bg-black/20 p-4 rounded-lg">
                                                <h4 className="font-bold text-yellow-300 mb-2">1. Progress Sequentially</h4>
                                                <p className="text-sm">Work through stages 1-8 in order. Each builds on the previous stage's insights.</p>
                                            </div>
                                            <div className="bg-black/20 p-4 rounded-lg">
                                                <h4 className="font-bold text-yellow-300 mb-2">2. Focus on Logic, Not Content</h4>
                                                <p className="text-sm">Ask yourself "WHY is this decision being made?" rather than memorizing what's presented.</p>
                                            </div>
                                            <div className="bg-black/20 p-4 rounded-lg">
                                                <h4 className="font-bold text-yellow-300 mb-2">3. Use Hover Tooltips</h4>
                                                <p className="text-sm">Many elements have ⓘ icons or hover explanations providing deeper context.</p>
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="bg-black/20 p-4 rounded-lg">
                                                <h4 className="font-bold text-yellow-300 mb-2">4. Compare Scenarios</h4>
                                                <p className="text-sm">Pay special attention to how the SAME company performs differently across the 4 scenarios.</p>
                                            </div>
                                            <div className="bg-black/20 p-4 rounded-lg">
                                                <h4 className="font-bold text-yellow-300 mb-2">5. Study Teaching Points</h4>
                                                <p className="text-sm">Each stage ends with "Key Teaching Points" linking back to your project requirements.</p>
                                            </div>
                                            <div className="bg-black/20 p-4 rounded-lg">
                                                <h4 className="font-bold text-yellow-300 mb-2">6. Apply to YOUR Industry</h4>
                                                <p className="text-sm">As you explore each stage, imagine how you'd adapt this thinking to your chosen industry.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Additional Context */}
                            <div className="bg-gradient-to-r from-blue-600/30 to-indigo-600/30 p-6 rounded-xl border-2 border-blue-400">
                                <h4 className="font-bold text-blue-200 mb-3 text-center flex items-center justify-center gap-2">
                                    <Globe className="w-5 h-5" />
                                    Additional Learning Resources
                                </h4>
                                <p className="text-blue-100 text-sm text-center leading-relaxed">
                                    For additional context on the BCI landscape, visit <span className="font-semibold text-blue-200">Moodle → Strategy Video Case Room → Topic 3 Practice Case</span>: <span className="italic">"The Brain-Computer Interfaces Frontier – Navigating the Future of Neurotechnology"</span>. This video provides real-world insights into the emerging BCI industry and complements the scenario planning methodology demonstrated here.
                                </p>
                            </div>

                            {/* Next Steps */}
                            <div className="flex justify-center mt-8">
                                <button
                                    onClick={() => setActiveStage(0)}
                                    className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-bold text-lg hover:scale-105 transition-transform shadow-lg"
                                >
                                    Begin Stage 1: Defining the Focal Issue
                                    <ArrowRight className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Dashboard Introduction: Focal Issue */}
                    {activeStage === 0 && (
                        <div className="space-y-8">
                            <div className="text-center">
                                <h2 className="text-3xl font-bold mb-4 text-purple-300">Step 1: Defining the Focal Issue</h2>
                                <div className="bg-gradient-to-r from-purple-600/30 to-pink-600/30 p-8 rounded-xl border-2 border-purple-400">
                                    <p className="text-2xl font-semibold mb-2">Focal Question</p>
                                    <p className="text-xl italic">{focalIssue.question}</p>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="bg-purple-800/30 p-6 rounded-xl">
                                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                        <Calendar className="w-6 h-6" />
                                        Time Horizon: {focalIssue.horizon}
                                    </h3>
                                    <p className="text-purple-200 mb-4">A 10-year strategic planning window (2025-2035)</p>
                                </div>

                                <div className="bg-pink-800/30 p-6 rounded-xl">
                                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                        <Zap className="w-6 h-6" />
                                        Focus Area
                                    </h3>
                                    <p className="text-pink-200">Brain-Computer Interface technology's impact across work, health, and society</p>
                                </div>
                            </div>

                            <div className="bg-indigo-800/30 p-6 rounded-xl">
                                <div className="group relative mb-4">
                                    <h3 className="text-xl font-bold cursor-help">
                                        Justification for 2035 Horizon
                                        <span className="ml-1 text-sm text-indigo-400">ⓘ</span>
                                    </h3>
                                    {/* Tooltip */}
                                    <div className="absolute left-0 top-full mt-2 w-96 bg-gray-900 text-white text-xs p-3 rounded-lg shadow-xl border border-indigo-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                                        <span className="font-semibold text-indigo-300">Why choose a time horizon?</span> Strategic scenario planning requires selecting a future point far enough to allow for meaningful change, but near enough to inform current decisions. The 2035 horizon (10 years) balances uncertainty with actionability—it's beyond typical 3-5 year plans, allowing transformative shifts to unfold, while remaining relevant to today's strategic choices.
                                    </div>
                                </div>
                                <ul className="space-y-3">
                                    {focalIssue.justification.map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <span className="text-sm font-bold">{idx + 1}</span>
                                            </div>
                                            <span className="text-indigo-100">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Navigation Button */}
                            <div className="flex justify-center mt-8">
                                <button
                                    onClick={() => setActiveStage(1)}
                                    className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-bold text-lg hover:scale-105 transition-transform shadow-lg"
                                >
                                    Continue to Stage 2: Scanning for Signals
                                    <ArrowRight className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Dashboard Introduction: Scanning for Signals */}
                    {activeStage === 1 && (
                        <div className="space-y-6">
                            <div className="text-center mb-6">
                                <h2 className="text-3xl font-bold mb-2 text-purple-300">Step 2: Scanning for Signals</h2>
                                <p className="text-xl text-purple-200">49 Critical Uncertainties Across PESTLE Dimensions</p>
                            </div>

                            {/* View Toggle */}
                            <div className="flex justify-center gap-3 mb-6">
                                <button
                                    onClick={() => setViewType('list')}
                                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${viewType === 'list'
                                        ? 'bg-white text-purple-900'
                                        : 'bg-purple-700/50 hover:bg-purple-600/50'
                                        }`}
                                >
                                    List View
                                </button>
                                <button
                                    onClick={() => setViewType('category')}
                                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${viewType === 'category'
                                        ? 'bg-white text-purple-900'
                                        : 'bg-purple-700/50 hover:bg-purple-600/50'
                                        }`}
                                >
                                    Category View
                                </button>
                                <button
                                    onClick={() => setViewType('mindmap')}
                                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${viewType === 'mindmap'
                                        ? 'bg-white text-purple-900'
                                        : 'bg-purple-700/50 hover:bg-purple-600/50'
                                        }`}
                                >
                                    Mind Map View
                                </button>
                            </div>

                            {viewType === 'category' ? (
                                /* Category View - Comprehensive Grid */
                                <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 p-8 rounded-xl">
                                    <div className="text-center mb-6">
                                        <div className="inline-flex items-center gap-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl p-4 shadow-2xl border-4 border-white/50">
                                            <Brain className="w-10 h-10" />
                                            <div>
                                                <p className="font-bold text-xl">BCI Future Uncertainties</p>
                                                <p className="text-sm">Complete PESTLE Overview: 49 Critical Factors</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Grid of PESTLE Categories with All Uncertainties */}
                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[700px] overflow-y-auto pr-2">
                                        {Object.keys(pestleColors).map((category) => {
                                            const categoryUncertainties = uncertainties.filter(u => u.category === category);

                                            return (
                                                <div key={category} className={`${pestleColors[category]}/20 border-2 border-white/30 rounded-xl p-4`}>
                                                    {/* Category Header */}
                                                    <div className={`${pestleColors[category]} rounded-lg p-3 mb-4 text-center shadow-lg`}>
                                                        <p className="font-bold text-lg">{category}</p>
                                                        <p className="text-xs opacity-90">{categoryUncertainties.length} Uncertainties</p>
                                                    </div>

                                                    {/* All Uncertainties in this Category */}
                                                    <div className="space-y-2">
                                                        {categoryUncertainties.map((uncertainty) => (
                                                            <div
                                                                key={uncertainty.id}
                                                                onMouseEnter={() => setSelectedUncertainty(uncertainty)}
                                                                onMouseLeave={() => setSelectedUncertainty(null)}
                                                                className={`bg-black/20 p-2 rounded-lg text-xs border border-white/10 hover:border-white/50 cursor-pointer transition-all ${selectedUncertainty?.id === uncertainty.id ? 'ring-2 ring-white scale-105' : ''
                                                                    }`}
                                                            >
                                                                <p className="font-semibold mb-1 leading-tight">{uncertainty.name}</p>
                                                                <div className="flex gap-2 text-[10px]">
                                                                    <span className="text-pink-300">I: {uncertainty.impact}</span>
                                                                    <span className="text-yellow-300">U: {uncertainty.uncertainty}</span>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* Hover Detail Panel */}
                                    {selectedUncertainty && (
                                        <div className="mt-6 bg-black/90 p-6 rounded-xl border-2 border-purple-400">
                                            <div className="flex items-start justify-between gap-3 mb-3">
                                                <h4 className="font-bold text-lg flex-1">{selectedUncertainty.name}</h4>
                                                <span className={`${pestleColors[selectedUncertainty.category]} px-3 py-1 rounded text-xs font-semibold flex-shrink-0`}>
                                                    {selectedUncertainty.category}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-300 mb-3">{selectedUncertainty.description}</p>
                                            <div className="flex gap-6 text-sm">
                                                <div>
                                                    <span className="text-gray-400">Impact: </span>
                                                    <span className="text-pink-300 font-bold">{selectedUncertainty.impact}/10</span>
                                                </div>
                                                <div>
                                                    <span className="text-gray-400">Uncertainty: </span>
                                                    <span className="text-yellow-300 font-bold">{selectedUncertainty.uncertainty}/10</span>
                                                </div>
                                                <div>
                                                    <span className="text-gray-400">Combined Score: </span>
                                                    <span className="text-purple-300 font-bold">{selectedUncertainty.impact + selectedUncertainty.uncertainty}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div className="mt-4 text-center text-sm text-purple-200 bg-purple-800/30 p-3 rounded-lg">
                                        All 49 uncertainties organized by PESTLE dimension. Hover over any factor for detailed information.
                                    </div>
                                </div>
                            ) : viewType === 'mindmap' ? (
                                <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-xl overflow-x-auto overflow-y-auto flex justify-center" style={{ maxHeight: '1500px' }} ref={mindmapScrollRef}>
                                    <div className="relative bg-purple-900/30 rounded-lg" style={{ width: '2600px', height: '1400px', minWidth: '2600px' }}>
                                        {/* Central Node */}
                                        <div className="absolute" style={{ left: '1300px', top: '700px', transform: 'translate(-50%, -50%)', zIndex: 30 }}>
                                            <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-8 shadow-2xl border-4 border-white">
                                                <div className="text-center">
                                                    <Brain className="w-20 h-20 mx-auto mb-3" />
                                                    <p className="font-bold text-3xl">BCI Future</p>
                                                    <p className="text-lg mt-2">2035 Horizon</p>
                                                    <p className="text-sm mt-2 opacity-90">49 Critical Uncertainties</p>
                                                    <p className="text-xs mt-1 opacity-75">6 PESTLE Dimensions</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* SVG Layer for all connection lines */}
                                        <svg className="absolute inset-0 pointer-events-none" style={{ width: '2600px', height: '1400px', zIndex: 1 }}>
                                            {Object.keys(pestleColors).map((category, idx) => {
                                                const angle = (idx / Object.keys(pestleColors).length) * 2 * Math.PI - Math.PI / 2;

                                                // Get category-specific configuration
                                                const config = mindMapConfig[category];
                                                const categoryRadius = config.categoryRadius;
                                                const cx = 1300 + Math.cos(angle) * categoryRadius;
                                                const cy = 700 + Math.sin(angle) * categoryRadius;

                                                const strokeColor = category === 'Political' ? '#a855f7' :
                                                    category === 'Economic' ? '#3b82f6' :
                                                        category === 'Social' ? '#ec4899' :
                                                            category === 'Technological' ? '#22c55e' :
                                                                category === 'Legal' ? '#eab308' : '#14b8a6';

                                                const categoryUncertainties = uncertainties.filter(u => u.category === category);
                                                const displayUncertainties = categoryUncertainties; // Show ALL factors

                                                return (
                                                    <g key={`lines-${category}`}>
                                                        {/* Main line to category */}
                                                        <line
                                                            x1="1300"
                                                            y1="700"
                                                            x2={cx}
                                                            y2={cy}
                                                            stroke={strokeColor}
                                                            strokeWidth="4"
                                                            opacity="0.6"
                                                        />
                                                        {/* Lines to uncertainties */}
                                                        {displayUncertainties.map((uncertainty, uIdx) => {
                                                            const totalFactors = displayUncertainties.length;
                                                            // Use category-specific angular spread and radius
                                                            const subAngle = angle + ((uIdx - (totalFactors - 1) / 2) * config.angularSpread);
                                                            const subRadius = config.subRadius;
                                                            const ux = cx + Math.cos(subAngle) * subRadius;
                                                            const uy = cy + Math.sin(subAngle) * subRadius;

                                                            return (
                                                                <line
                                                                    key={`line-${uncertainty.id}`}
                                                                    x1={cx}
                                                                    y1={cy}
                                                                    x2={ux}
                                                                    y2={uy}
                                                                    stroke={strokeColor}
                                                                    strokeWidth="2"
                                                                    opacity="0.4"
                                                                    strokeDasharray="5,3"
                                                                />
                                                            );
                                                        })}
                                                    </g>
                                                );
                                            })}
                                        </svg>

                                        {/* PESTLE Categories and their uncertainties */}
                                        {Object.keys(pestleColors).map((category, idx) => {
                                            const angle = (idx / Object.keys(pestleColors).length) * 2 * Math.PI - Math.PI / 2;

                                            // Get category-specific configuration
                                            const config = mindMapConfig[category];
                                            const categoryRadius = config.categoryRadius;
                                            const cx = 1300 + Math.cos(angle) * categoryRadius;
                                            const cy = 700 + Math.sin(angle) * categoryRadius;

                                            const categoryUncertainties = uncertainties.filter(u => u.category === category);
                                            const displayUncertainties = categoryUncertainties; // Show ALL factors

                                            return (
                                                <div key={category}>
                                                    {/* Category Node */}
                                                    <div
                                                        className={`absolute ${pestleColors[category]} rounded-2xl p-5 shadow-2xl border-4 border-white`}
                                                        style={{
                                                            left: `${cx}px`,
                                                            top: `${cy}px`,
                                                            transform: 'translate(-50%, -50%)',
                                                            minWidth: '200px',
                                                            zIndex: 20
                                                        }}
                                                    >
                                                        <p className="font-bold text-center text-xl mb-2">{category}</p>
                                                        <p className="text-sm text-center opacity-90">{categoryUncertainties.length} total factors</p>
                                                        <p className="text-sm text-center font-semibold mt-1">
                                                            Showing all {displayUncertainties.length}
                                                        </p>
                                                    </div>

                                                    {/* All uncertainties from this category */}
                                                    {displayUncertainties.map((uncertainty, uIdx) => {
                                                        const totalFactors = displayUncertainties.length;
                                                        // Use category-specific angular spread and radius
                                                        const subAngle = angle + ((uIdx - (totalFactors - 1) / 2) * config.angularSpread);
                                                        const subRadius = config.subRadius;
                                                        const ux = cx + Math.cos(subAngle) * subRadius;
                                                        const uy = cy + Math.sin(subAngle) * subRadius;

                                                        const isCritical = criticalDrivers.some(d => d.id === uncertainty.id);
                                                        const rank = isCritical ? criticalDrivers.findIndex(d => d.id === uncertainty.id) + 1 : null;

                                                        return (
                                                            <div
                                                                key={uncertainty.id}
                                                                onMouseEnter={() => setSelectedUncertainty(uncertainty)}
                                                                onMouseLeave={() => setSelectedUncertainty(null)}
                                                                className={`absolute cursor-pointer transition-all ${selectedUncertainty?.id === uncertainty.id ? 'scale-110 z-30' : 'z-10'
                                                                    }`}
                                                                style={{
                                                                    left: `${ux}px`,
                                                                    top: `${uy}px`,
                                                                    transform: 'translate(-50%, -50%)'
                                                                }}
                                                            >
                                                                <div className={`${pestleFactorColors[category]} rounded-xl p-3 shadow-xl border-2 ${isCritical ? 'border-pink-300 ring-2 ring-pink-400' : 'border-white/50'
                                                                    } min-w-[180px] max-w-[200px]`}>
                                                                    <div className="flex items-start gap-2 mb-1">
                                                                        {rank && (
                                                                            <span className="bg-pink-500 text-white text-sm font-bold rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                                                                                {rank}
                                                                            </span>
                                                                        )}
                                                                        <p className="text-xs font-bold leading-tight flex-1">
                                                                            {uncertainty.name}
                                                                        </p>
                                                                    </div>
                                                                    <div className="flex gap-2 text-[10px] mt-1">
                                                                        <span className="text-pink-200">Impact: {uncertainty.impact}</span>
                                                                        <span className="text-yellow-200">Uncertainty: {uncertainty.uncertainty}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            );
                                        })}

                                        {/* Hover Tooltip - Fixed at top center to avoid flickering */}
                                        {selectedUncertainty && (
                                            <div
                                                className="absolute bg-black/95 p-5 rounded-xl max-w-xl border-2 border-purple-400 shadow-2xl"
                                                style={{ left: '1300px', top: '20px', transform: 'translateX(-50%)', zIndex: 40 }}
                                            >
                                                <div className="flex items-start justify-between gap-3 mb-2">
                                                    <p className="font-bold text-lg flex-1">{selectedUncertainty.name}</p>
                                                    <span className={`${pestleColors[selectedUncertainty.category]} px-3 py-1 rounded text-xs font-semibold flex-shrink-0`}>
                                                        {selectedUncertainty.category}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-300 mb-3">{selectedUncertainty.description}</p>
                                                <div className="flex gap-6 text-sm">
                                                    <span className="text-pink-300 font-semibold">Impact: {selectedUncertainty.impact}/10</span>
                                                    <span className="text-yellow-300 font-semibold">Uncertainty: {selectedUncertainty.uncertainty}/10</span>
                                                    <span className="text-purple-300 font-semibold">Score: {selectedUncertainty.impact + selectedUncertainty.uncertainty}</span>
                                                </div>
                                            </div>
                                        )}

                                        {/* Description text inside canvas - centered with mind map */}
                                        <div className="absolute text-sm text-center text-purple-200 bg-purple-800/30 p-3 rounded-lg max-w-3xl" style={{ left: '1300px', bottom: '20px', transform: 'translateX(-50%)', zIndex: 5 }}>
                                            Comprehensive mind map showing all {uncertainties.length} uncertainties across all PESTLE dimensions. Critical drivers (top 10) are marked with pink numbers. Hover over any factor for detailed information.
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {/* PESTLE Filter */}
                                    <div className="flex flex-wrap justify-center gap-3 mb-6">
                                        <button
                                            onClick={() => setSelectedCategory('all')}
                                            className={`px-4 py-2 rounded-lg font-semibold transition-all ${selectedCategory === 'all'
                                                ? 'bg-white text-purple-900'
                                                : 'bg-purple-700/50 hover:bg-purple-600/50'
                                                }`}
                                        >
                                            All ({uncertainties.length})
                                        </button>
                                        {Object.keys(pestleColors).map((category) => (
                                            <button
                                                key={category}
                                                onClick={() => setSelectedCategory(category)}
                                                className={`px-4 py-2 rounded-lg font-semibold transition-all ${selectedCategory === category
                                                    ? 'bg-white text-purple-900'
                                                    : `${pestleColors[category]}/70 hover:${pestleColors[category]}`
                                                    }`}
                                            >
                                                {category} ({categoryCounts[category]})
                                            </button>
                                        ))}
                                    </div>

                                    {/* Uncertainties Grid - Enhanced with colored title backgrounds */}
                                    <div className="grid md:grid-cols-2 gap-4 max-h-[900px] overflow-y-auto pr-2">
                                        {filteredUncertainties.map((uncertainty) => (
                                            <div
                                                key={uncertainty.id}
                                                className="bg-black/40 border-2 border-white/20 hover:border-white/50 rounded-xl transition-all overflow-hidden"
                                            >
                                                {/* Title with colored background */}
                                                <div className={`${pestleColors[uncertainty.category]} p-3`}>
                                                    <div className="flex items-start justify-between gap-2">
                                                        <h4 className="font-bold text-base flex-1 leading-tight">{uncertainty.name}</h4>
                                                        <span className="bg-black/30 px-2 py-1 rounded text-xs font-semibold flex-shrink-0">
                                                            {uncertainty.category}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Content area */}
                                                <div className="p-4">
                                                    <p className="text-sm text-purple-100 mb-3 leading-relaxed">{uncertainty.description}</p>
                                                    <div className="flex gap-4 text-sm bg-black/30 p-2 rounded-lg">
                                                        <div className="flex items-center gap-1">
                                                            <span className="font-semibold text-gray-300">Impact:</span>
                                                            <span className="text-pink-300 font-bold">{uncertainty.impact}/10</span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <span className="font-semibold text-gray-300">Uncertainty:</span>
                                                            <span className="text-yellow-300 font-bold">{uncertainty.uncertainty}/10</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}

                            <div className="bg-purple-700/30 p-4 rounded-xl">
                                <div className="flex items-start gap-3">
                                    <AlertCircle className="w-6 h-6 text-yellow-300 flex-shrink-0 mt-1" />
                                    <div>
                                        <p className="font-semibold mb-1">Framing Principles Applied:</p>
                                        <ul className="text-sm text-purple-200 space-y-1">
                                            <li>• <span className="font-semibold">Be Specific:</span> Each factor is measurable and concrete</li>
                                            <li>• <span className="font-semibold">Be Neutral:</span> Framed as axes with ranges, not predetermined outcomes</li>
                                            <li>• <span className="font-semibold">Be Comprehensive:</span> Include 40 factors across all PESTLE dimensions (we demonstrated 49 for thoroughness, but 40 is sufficient)</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Navigation Button */}
                            <div className="flex justify-center mt-8">
                                <button
                                    onClick={() => setActiveStage(2)}
                                    className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-bold text-lg hover:scale-105 transition-transform shadow-lg"
                                >
                                    Continue to Stage 3: Impact-Uncertainty Matrix
                                    <ArrowRight className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Dashboard Introduction: Impact-Uncertainty Matrix */}
                    {activeStage === 2 && (
                        <div className="space-y-6">
                            <div className="text-center mb-6">
                                <h2 className="text-3xl font-bold mb-2 text-purple-300">Step 3: Impact-Uncertainty Matrix</h2>
                                <p className="text-xl text-purple-200">Prioritising the Critical Scenario Drivers</p>
                            </div>

                            {/* Summary Statistics */}
                            <div className="grid grid-cols-4 gap-3 mb-4">
                                <div className="bg-purple-800/40 p-4 rounded-lg text-center border border-purple-500/30">
                                    <p className="text-3xl font-bold text-purple-300">{uncertainties.length}</p>
                                    <p className="text-xs text-purple-200 mt-1">Total Factors Plotted</p>
                                </div>
                                <div className="bg-pink-800/40 p-4 rounded-lg text-center border border-pink-500/30">
                                    <p className="text-3xl font-bold text-pink-300">{criticalDrivers.length}</p>
                                    <p className="text-xs text-pink-200 mt-1">Critical Drivers (Numbered)</p>
                                </div>
                                <div className="bg-yellow-800/40 p-4 rounded-lg text-center border border-yellow-500/30">
                                    <p className="text-3xl font-bold text-yellow-300">
                                        {uncertainties.filter(u => u.impact >= 8 && u.uncertainty >= 8).length}
                                    </p>
                                    <p className="text-xs text-yellow-200 mt-1">High Impact + Uncertainty</p>
                                </div>
                                <div className="bg-green-800/40 p-4 rounded-lg text-center border border-green-500/30">
                                    <p className="text-3xl font-bold text-green-300">3</p>
                                    <p className="text-xs text-green-200 mt-1">Text-Labeled (Top 3)</p>
                                </div>
                            </div>

                            {/* Matrix */}
                            <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 p-8 rounded-xl">
                                <div className="relative bg-purple-950/40 rounded-lg" style={{ height: '700px', padding: '50px 40px' }}>
                                    {/* Axes Labels */}
                                    <div className="absolute -left-20 top-1/2 -translate-y-1/2 -rotate-90 text-sm font-semibold whitespace-nowrap">
                                        IMPACT →
                                    </div>
                                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-8 text-sm font-semibold">
                                        UNCERTAINTY →
                                    </div>

                                    {/* Quadrant Labels */}
                                    <div className="absolute top-16 left-16 text-xs font-semibold text-blue-300 bg-black/30 px-2 py-1 rounded z-10">
                                        Critical Planning Issues
                                    </div>
                                    <div className="absolute top-16 right-16 text-xs font-semibold text-pink-300 bg-black/30 px-2 py-1 rounded z-10">
                                        Critical Scenario Drivers
                                    </div>
                                    <div className="absolute bottom-24 left-16 text-xs font-semibold text-purple-300/50 bg-black/30 px-2 py-1 rounded z-10">
                                        Monitor
                                    </div>
                                    <div className="absolute" style={{ top: '42%', right: '60px' }}>
                                        <div className="text-xs font-semibold text-orange-300 bg-black/30 px-2 py-1 rounded z-10">
                                            Important Scenario Drivers
                                        </div>
                                    </div>

                                    {/* Container for the actual plotting area */}
                                    <div className="absolute inset-0" style={{ margin: '50px 40px' }}>
                                        {/* Grid and Lines using SVG for better control */}
                                        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
                                            {/* Grid lines */}
                                            <line x1="33.33%" y1="0" x2="33.33%" y2="100%" stroke="rgb(168, 85, 247, 0.2)" strokeWidth="1" />
                                            <line x1="66.66%" y1="0" x2="66.66%" y2="100%" stroke="rgb(168, 85, 247, 0.2)" strokeWidth="1" />
                                            <line x1="0" y1="33.33%" x2="100%" y2="33.33%" stroke="rgb(168, 85, 247, 0.2)" strokeWidth="1" />
                                            <line x1="0" y1="66.66%" x2="100%" y2="66.66%" stroke="rgb(168, 85, 247, 0.2)" strokeWidth="1" />
                                            {/* Thicker dividing lines */}
                                            <line x1="33.33%" y1="0" x2="33.33%" y2="100%" stroke="rgb(168, 85, 247, 0.5)" strokeWidth="2" />
                                            <line x1="66.66%" y1="0" x2="66.66%" y2="100%" stroke="rgb(168, 85, 247, 0.5)" strokeWidth="2" />
                                            <line x1="0" y1="33.33%" x2="100%" y2="33.33%" stroke="rgb(168, 85, 247, 0.5)" strokeWidth="2" />
                                            <line x1="0" y1="66.66%" x2="100%" y2="66.66%" stroke="rgb(168, 85, 247, 0.5)" strokeWidth="2" />
                                        </svg>

                                        {/* SVG Layer for connecting lines from dots to labels */}
                                        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 14 }}>
                                            {criticalDrivers.slice(0, 3).map((driver, idx) => {
                                                const rank = idx + 1;

                                                // Get parent container dimensions for calculations
                                                const containerWidth = 100; // percentage
                                                const containerHeight = 100; // percentage

                                                // Dot position (same calculation as below)
                                                const dotX = ((driver.uncertainty - 0) / (10 - 0)) * containerWidth;
                                                const dotY = ((10 - driver.impact) / (10 - 0)) * containerHeight;

                                                // Smart label positioning to avoid overlap
                                                let labelX = dotX;
                                                let labelY = dotY - 12; // Default: above

                                                if (rank === 1) {
                                                    // First driver: position above-left
                                                    labelX = dotX - 5;
                                                    labelY = dotY - 12;
                                                } else if (rank === 2) {
                                                    // Second driver: position above-right
                                                    labelX = dotX + 5;
                                                    labelY = dotY - 12;
                                                } else if (rank === 3) {
                                                    // Third driver: position below if near top, otherwise above
                                                    if (dotY < 20) {
                                                        labelY = dotY + 12;
                                                    } else {
                                                        labelY = dotY - 12;
                                                    }
                                                    labelX = dotX;
                                                }

                                                // Draw connecting line
                                                return (
                                                    <line
                                                        key={`connector-${driver.id}`}
                                                        x1={`${dotX}%`}
                                                        y1={`${dotY}%`}
                                                        x2={`${labelX}%`}
                                                        y2={`${labelY}%`}
                                                        stroke="rgb(244, 114, 182)"
                                                        strokeWidth="2"
                                                        opacity="0.5"
                                                    />
                                                );
                                            })}
                                        </svg>

                                        {/* Text labels for top 3 with smart positioning */}
                                        {criticalDrivers.slice(0, 3).map((driver, idx) => {
                                            const rank = idx + 1;

                                            // Calculate position: map from [0-10] to [0-100%]
                                            // X-axis: uncertainty (0-10 maps to left-right)
                                            // Y-axis: impact (0-10 maps to bottom-top, so we invert)
                                            const dotX = ((driver.uncertainty - 0) / (10 - 0)) * 100;
                                            const dotY = ((10 - driver.impact) / (10 - 0)) * 100;

                                            // Smart label positioning to avoid overlap
                                            let labelX = dotX;
                                            let labelY = dotY - 12; // Default: above (in %)
                                            let transformOrigin = 'center bottom';

                                            if (rank === 1) {
                                                // First driver: position above-left
                                                labelX = dotX - 5;
                                                labelY = dotY - 12;
                                                transformOrigin = 'right bottom';
                                            } else if (rank === 2) {
                                                // Second driver: position above-right
                                                labelX = dotX + 5;
                                                labelY = dotY - 12;
                                                transformOrigin = 'left bottom';
                                            } else if (rank === 3) {
                                                // Third driver: check if near top edge
                                                if (dotY < 20) {
                                                    labelY = dotY + 12; // Position below
                                                    transformOrigin = 'center top';
                                                } else {
                                                    labelY = dotY - 12; // Position above
                                                    transformOrigin = 'center bottom';
                                                }
                                                labelX = dotX;
                                            }

                                            // Create shortened name (first 4 words max)
                                            const shortName = driver.name.split(' ').slice(0, 4).join(' ');

                                            return (
                                                <div
                                                    key={`label-${driver.id}`}
                                                    className="absolute pointer-events-none"
                                                    style={{
                                                        left: `${labelX}%`,
                                                        top: `${labelY}%`,
                                                        zIndex: 15,
                                                        transformOrigin: transformOrigin
                                                    }}
                                                >
                                                    <div className="bg-pink-600 text-white text-xs font-bold px-3 py-2 rounded-lg border-2 border-pink-300 shadow-2xl whitespace-nowrap"
                                                        style={{
                                                            transform: transformOrigin.includes('right') ? 'translateX(-100%)' :
                                                                transformOrigin.includes('left') ? 'translateX(0%)' :
                                                                    'translateX(-50%)'
                                                        }}>
                                                        #{rank}: {shortName}
                                                    </div>
                                                </div>
                                            );
                                        })}

                                        {/* ALL 49 Dots - Improved positioning with jitter for overlapping */}
                                        {(() => {
                                            // Group uncertainties by position to detect overlaps
                                            const positionGroups = {};
                                            uncertainties.forEach((u, idx) => {
                                                const baseX = ((u.uncertainty - 0) / (10 - 0)) * 100;
                                                const baseY = ((10 - u.impact) / (10 - 0)) * 100;
                                                const key = `${baseX.toFixed(1)},${baseY.toFixed(1)}`;
                                                if (!positionGroups[key]) positionGroups[key] = [];
                                                positionGroups[key].push({ ...u, originalIndex: idx });
                                            });

                                            return uncertainties.map((u, idx) => {
                                                const isCritical = criticalDrivers.some(d => d.id === u.id);
                                                const rank = isCritical ? criticalDrivers.findIndex(d => d.id === u.id) + 1 : null;

                                                // Base position
                                                let x = ((u.uncertainty - 0) / (10 - 0)) * 100;
                                                let y = ((10 - u.impact) / (10 - 0)) * 100;

                                                // Add jitter for overlapping dots
                                                const key = `${x.toFixed(1)},${y.toFixed(1)}`;
                                                const group = positionGroups[key];
                                                if (group && group.length > 1) {
                                                    const indexInGroup = group.findIndex(item => item.id === u.id);
                                                    const angle = (indexInGroup / group.length) * 2 * Math.PI;
                                                    const jitterRadius = 2; // 2% offset
                                                    x += Math.cos(angle) * jitterRadius;
                                                    y += Math.sin(angle) * jitterRadius;
                                                }

                                                // Determine quadrant for color-coding
                                                // Quadrants: High Impact (>6.67) vs Low, High Uncertainty (>6.67) vs Low
                                                const isHighImpact = u.impact >= 6.67;
                                                const isHighUncertainty = u.uncertainty >= 6.67;

                                                let dotColor, ringColor;
                                                if (isCritical) {
                                                    // Critical drivers always pink
                                                    dotColor = 'bg-pink-400';
                                                    ringColor = 'ring-pink-300/50';
                                                } else if (isHighImpact && !isHighUncertainty) {
                                                    // Critical Planning Issues (high impact, low uncertainty) - blue
                                                    dotColor = 'bg-blue-400';
                                                    ringColor = 'ring-blue-300/50';
                                                } else if (isHighImpact && isHighUncertainty) {
                                                    // Critical Scenario Drivers area (but not in top 10) - lighter pink
                                                    dotColor = 'bg-pink-300';
                                                    ringColor = 'ring-pink-200/50';
                                                } else if (!isHighImpact && isHighUncertainty) {
                                                    // Important Scenario Drivers (low impact, high uncertainty) - orange
                                                    dotColor = 'bg-orange-400';
                                                    ringColor = 'ring-orange-300/50';
                                                } else {
                                                    // Monitor (low impact, low uncertainty) - gray
                                                    dotColor = 'bg-gray-400';
                                                    ringColor = 'ring-gray-300/50';
                                                }

                                                // Box shadow based on quadrant
                                                let boxShadow;
                                                if (isCritical) {
                                                    boxShadow = '0 4px 10px rgba(244, 114, 182, 0.5)'; // Pink
                                                } else if (isHighImpact && !isHighUncertainty) {
                                                    boxShadow = '0 2px 6px rgba(96, 165, 250, 0.4)'; // Blue
                                                } else if (isHighImpact && isHighUncertainty) {
                                                    boxShadow = '0 2px 6px rgba(249, 168, 212, 0.4)'; // Light pink
                                                } else if (!isHighImpact && isHighUncertainty) {
                                                    boxShadow = '0 2px 6px rgba(251, 146, 60, 0.4)'; // Orange
                                                } else {
                                                    boxShadow = '0 2px 6px rgba(156, 163, 175, 0.4)'; // Gray
                                                }

                                                const size = isCritical ? 26 : 16;

                                                return (
                                                    <div
                                                        key={`dot-${u.id}`}
                                                        onMouseEnter={() => setSelectedUncertainty(u)}
                                                        onMouseLeave={() => setSelectedUncertainty(null)}
                                                        className={`absolute rounded-full cursor-pointer transition-all ${dotColor} ${isCritical ? 'ring-2 ' + ringColor : ''
                                                            } ${selectedUncertainty?.id === u.id ? 'ring-4 ring-white scale-150' : ''
                                                            }`}
                                                        style={{
                                                            left: `${x}%`,
                                                            top: `${y}%`,
                                                            width: `${size}px`,
                                                            height: `${size}px`,
                                                            marginLeft: `-${size / 2}px`,
                                                            marginTop: `-${size / 2}px`,
                                                            zIndex: selectedUncertainty?.id === u.id ? 50 : (isCritical ? 25 : 20),
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            boxShadow: boxShadow,
                                                        }}
                                                    >
                                                        {rank && rank <= 10 && (
                                                            <span className="text-white text-xs font-bold leading-none">
                                                                {rank}
                                                            </span>
                                                        )}
                                                    </div>
                                                );
                                            });
                                        })()}

                                        {/* Enhanced Hover Tooltip - positioned outside matrix */}
                                        {selectedUncertainty && (
                                            <div
                                                className="absolute bg-black/95 p-4 rounded-lg border-2 border-pink-400 shadow-2xl"
                                                style={{
                                                    left: '50%',
                                                    top: '-60px',
                                                    transform: 'translateX(-50%)',
                                                    zIndex: 60,
                                                    minWidth: '300px',
                                                    maxWidth: '450px'
                                                }}
                                            >
                                                <div className="flex items-start justify-between gap-2 mb-2">
                                                    <p className="font-bold flex-1 text-sm">{selectedUncertainty.name}</p>
                                                    <span className={`${pestleColors[selectedUncertainty.category]} px-2 py-1 rounded text-xs font-semibold flex-shrink-0`}>
                                                        {selectedUncertainty.category}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-gray-300 mb-3">{selectedUncertainty.description}</p>
                                                <div className="flex gap-4 text-xs bg-purple-900/50 p-2 rounded">
                                                    <div>
                                                        <span className="text-gray-400">Impact: </span>
                                                        <span className="text-pink-300 font-bold">{selectedUncertainty.impact}/10</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-gray-400">Uncertainty: </span>
                                                        <span className="text-yellow-300 font-bold">{selectedUncertainty.uncertainty}/10</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-gray-400">Score: </span>
                                                        <span className="text-purple-300 font-bold">{selectedUncertainty.impact + selectedUncertainty.uncertainty}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="bg-purple-700/30 p-4 rounded-xl text-sm text-purple-200">
                                <p className="font-semibold mb-3 text-base">How to read the matrix:</p>

                                {/* Color Legend */}
                                <div className="bg-black/30 p-3 rounded-lg mb-3">
                                    <p className="font-semibold text-white mb-2 text-xs">Quadrant Color Legend:</p>
                                    <div className="grid grid-cols-2 gap-2 text-xs">
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 rounded-full bg-pink-400 shadow-md"></div>
                                            <span className="text-pink-300 font-semibold">Critical Scenario Drivers (Top 10)</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 rounded-full bg-blue-400 shadow-md"></div>
                                            <span className="text-blue-300 font-semibold">Critical Planning Issues</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 rounded-full bg-pink-300 shadow-md"></div>
                                            <span className="text-pink-200">Important Scenario Drivers Area</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 rounded-full bg-orange-400 shadow-md"></div>
                                            <span className="text-orange-300">Lower Impact Scenario Drivers</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 rounded-full bg-gray-400 shadow-md"></div>
                                            <span className="text-gray-300">Monitor (Low Priority)</span>
                                        </div>
                                    </div>
                                </div>

                                <ul className="space-y-1.5">
                                    <li>• <span className="font-semibold text-white">ALL {uncertainties.length} uncertainties are plotted</span> - colors indicate quadrant position</li>
                                    <li>• <span className="font-semibold text-pink-300">Large pink dots with numbers (1-10)</span> = Top 10 Critical Scenario Drivers (ranked by combined score)</li>
                                    <li>• <span className="font-semibold text-white">Top 3 critical drivers have text labels</span> positioned to avoid overlap</li>
                                    <li>• <span className="font-semibold text-blue-300">Blue dots</span> = Critical Planning Issues (high impact, low uncertainty - important but predictable)</li>
                                    <li>• <span className="font-semibold">Hover over ANY point</span> to see full details including name, description, category, and scores</li>
                                </ul>
                            </div>

                            {/* Critical Drivers List */}
                            <div className="bg-pink-900/30 p-6 rounded-xl border border-pink-500/30">
                                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <TrendingUp className="w-6 h-6" />
                                    Top 10 Critical Scenario Drivers (Ranked by Combined Score)
                                </h3>
                                <p className="text-sm text-pink-200 mb-4">
                                    All 10 drivers are numbered on the matrix. The top 3 also have text labels for immediate identification.
                                </p>
                                <div className="grid md:grid-cols-2 gap-3">
                                    {criticalDrivers.map((driver, idx) => (
                                        <div
                                            key={driver.id}
                                            className={`bg-black/20 p-3 rounded-lg hover:bg-black/40 transition-all cursor-pointer border ${idx < 3 ? 'border-green-400/50 bg-green-900/10' : 'border-pink-400/20'
                                                }`}
                                            onMouseEnter={() => setSelectedUncertainty(driver)}
                                            onMouseLeave={() => setSelectedUncertainty(null)}
                                        >
                                            <div className="flex items-start gap-2">
                                                <span className="bg-pink-500 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                                                    {idx + 1}
                                                </span>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-semibold text-sm leading-tight mb-1">{driver.name}</p>
                                                    <div className="flex flex-wrap items-center gap-2 mt-1">
                                                        <span className={`${pestleColors[driver.category]} px-2 py-0.5 rounded text-[10px] font-semibold`}>
                                                            {driver.category}
                                                        </span>
                                                        <span className="text-xs text-purple-200">
                                                            I:{driver.impact} U:{driver.uncertainty} = {driver.combinedScore}
                                                        </span>
                                                        {idx < 3 && (
                                                            <span className="text-[9px] text-green-300 font-semibold bg-green-900/40 px-1.5 py-0.5 rounded border border-green-400/30">
                                                                TEXT LABEL
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Critical Planning Issues - Impactful But Expected Trends */}
                            <div className="bg-blue-900/30 p-6 rounded-xl border border-blue-500/30">
                                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <AlertCircle className="w-6 h-6 text-blue-300" />
                                    <span className="text-blue-300">Critical Planning Issues: Impactful But Expected Trends</span>
                                </h3>
                                <p className="text-sm text-blue-200 mb-4">
                                    These factors (blue dots on matrix) have <span className="font-semibold">high impact but low uncertainty</span>. While they are not key scenario drivers,
                                    they represent <span className="font-semibold">predictable trends with significant consequences</span> that should be incorporated into all scenario narratives
                                    to ground your scenarios in reality.
                                </p>

                                <div className="bg-black/20 p-4 rounded-lg mb-4">
                                    <h4 className="font-semibold text-sm mb-2 text-blue-200">Strategic Value:</h4>
                                    <ul className="text-xs text-blue-100 space-y-1.5">
                                        <li>• <span className="font-semibold">Known Constraints:</span> These represent established boundaries that scenarios must work within</li>
                                        <li>• <span className="font-semibold">Scenario Enrichment:</span> Adding these factors creates more credible and detailed narratives</li>
                                        <li>• <span className="font-semibold">Planning Certainties:</span> Organizations can confidently prepare for these impacts across all scenarios</li>
                                        <li>• <span className="font-semibold">Context Setting:</span> They provide the backdrop against which uncertain drivers play out</li>
                                    </ul>
                                </div>

                                <div className="grid md:grid-cols-2 gap-3">
                                    {uncertainties
                                        .filter(u => u.impact >= 7 && u.uncertainty <= 4)
                                        .sort((a, b) => b.impact - a.impact)
                                        .map((issue) => (
                                            <div
                                                key={issue.id}
                                                className="bg-black/20 p-3 rounded-lg hover:bg-black/40 transition-all cursor-pointer border border-blue-400/30"
                                                onMouseEnter={() => setSelectedUncertainty(issue)}
                                                onMouseLeave={() => setSelectedUncertainty(null)}
                                            >
                                                <div className="flex items-start gap-2">
                                                    <div className="w-6 h-6 rounded-full bg-blue-400 flex-shrink-0"></div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="font-semibold text-sm leading-tight mb-1">{issue.name}</p>
                                                        <div className="flex flex-wrap items-center gap-2 mt-1">
                                                            <span className={`${pestleColors[issue.category]} px-2 py-0.5 rounded text-[10px] font-semibold`}>
                                                                {issue.category}
                                                            </span>
                                                            <span className="text-xs text-blue-200">
                                                                Impact:{issue.impact} | Uncertainty:{issue.uncertainty}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>

                            {/* Navigation Button */}
                            <div className="flex justify-center mt-8">
                                <button
                                    onClick={() => setActiveStage(3)}
                                    className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-bold text-lg hover:scale-105 transition-transform shadow-lg"
                                >
                                    Continue to Stage 4: Mapping Driver Connections
                                    <ArrowRight className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Dashboard Introduction: Mapping Connections */}
                    {activeStage === 3 && (
                        <div className="space-y-6">
                            <div className="text-center mb-6">
                                <h2 className="text-3xl font-bold mb-2 text-purple-300">Step 4: Mapping Driver Connections</h2>
                                <p className="text-xl text-purple-200">Identifying Linchpin Factors Through Network Analysis</p>
                            </div>

                            {/* Network Visualization */}
                            <div className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 p-8 rounded-xl">
                                <div className="relative" style={{ height: '500px' }}>
                                    {/* Drivers as nodes in circular layout */}
                                    {criticalDrivers.map((driver, idx) => {
                                        const angle = (idx / criticalDrivers.length) * 2 * Math.PI;
                                        const radius = 180;
                                        const x = 50 + Math.cos(angle) * radius / 4;
                                        const y = 50 + Math.sin(angle) * radius / 4;

                                        const connectionCount = driverConnections.filter(
                                            c => c.from === driver.id || c.to === driver.id
                                        ).length;

                                        const isLinchpin = connectionCount >= 2;
                                        const isChosenAxis = driver.id === chosenAxes.axis1.id || driver.id === chosenAxes.axis2.id;

                                        return (
                                            <div
                                                key={driver.id}
                                                onMouseEnter={() => setHoveredDriver(driver.id)}
                                                onMouseLeave={() => setHoveredDriver(null)}
                                                className={`absolute cursor-pointer transition-all ${isChosenAxis
                                                    ? 'bg-gradient-to-br from-green-400 to-emerald-500 ring-4 ring-green-300/70'
                                                    : isLinchpin
                                                        ? 'bg-pink-500 ring-4 ring-pink-400/50'
                                                        : 'bg-purple-400'
                                                    } ${hoveredDriver === driver.id
                                                        ? 'scale-150 z-10'
                                                        : 'scale-100'
                                                    }`}
                                                style={{
                                                    left: `${x}%`,
                                                    top: `${y}%`,
                                                    transform: 'translate(-50%, -50%)',
                                                    width: '60px',
                                                    height: '60px',
                                                    borderRadius: '50%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}
                                            >
                                                <span className="text-white font-bold text-center px-1" style={{ fontSize: '8px', lineHeight: '1.1' }}>
                                                    {driver.name.split(' ').slice(0, 3).join(' ')}
                                                </span>
                                            </div>
                                        );
                                    })}

                                    {/* Draw connections as SVG lines */}
                                    <svg className="absolute inset-0 pointer-events-none" style={{ width: '100%', height: '100%' }}>
                                        {driverConnections.map((connection, idx) => {
                                            const fromDriver = criticalDrivers.find(d => d.id === connection.from);
                                            const toDriver = criticalDrivers.find(d => d.id === connection.to);

                                            if (!fromDriver || !toDriver) return null;

                                            const fromIdx = criticalDrivers.indexOf(fromDriver);
                                            const toIdx = criticalDrivers.indexOf(toDriver);

                                            const fromAngle = (fromIdx / criticalDrivers.length) * 2 * Math.PI;
                                            const toAngle = (toIdx / criticalDrivers.length) * 2 * Math.PI;
                                            const radius = 180;

                                            const x1 = 50 + Math.cos(fromAngle) * radius / 4;
                                            const y1 = 50 + Math.sin(fromAngle) * radius / 4;
                                            const x2 = 50 + Math.cos(toAngle) * radius / 4;
                                            const y2 = 50 + Math.sin(toAngle) * radius / 4;

                                            const isActive = hoveredDriver === connection.from || hoveredDriver === connection.to;

                                            return (
                                                <line
                                                    key={idx}
                                                    x1={`${x1}%`}
                                                    y1={`${y1}%`}
                                                    x2={`${x2}%`}
                                                    y2={`${y2}%`}
                                                    stroke={connection.type === 'feedback' ? '#fbbf24' : '#a78bfa'}
                                                    strokeWidth={isActive ? '3' : '1.5'}
                                                    strokeDasharray={connection.type === 'feedback' ? '5,5' : '0'}
                                                    opacity={isActive ? '1' : '0.3'}
                                                />
                                            );
                                        })}
                                    </svg>

                                    {/* Hover Info */}
                                    {hoveredDriver && (
                                        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/90 p-4 rounded-lg max-w-md z-20">
                                            {(() => {
                                                const driver = criticalDrivers.find(d => d.id === hoveredDriver);
                                                const connections = driverConnections.filter(
                                                    c => c.from === hoveredDriver || c.to === hoveredDriver
                                                );
                                                return (
                                                    <>
                                                        <p className="font-bold mb-2">{driver?.name}</p>
                                                        <p className="text-xs text-gray-400 mb-2">{connections.length} connection(s)</p>
                                                        {connections.map((conn, idx) => (
                                                            <p key={idx} className="text-xs text-purple-200 mb-1">
                                                                • {conn.description}
                                                            </p>
                                                        ))}
                                                    </>
                                                );
                                            })()}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Legend & Insights */}
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-purple-800/30 p-6 rounded-xl">
                                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                        <Network className="w-5 h-5" />
                                        Understanding Connection Types
                                    </h3>

                                    <div className="space-y-4 text-sm">
                                        {/* Cause-Effect */}
                                        <div className="bg-black/20 p-3 rounded-lg">
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="w-8 h-0.5 bg-purple-400"></div>
                                                <span className="font-semibold text-purple-300">Cause-Effect Relationship (Solid Purple Line)</span>
                                            </div>
                                            <p className="text-xs text-purple-100 mb-2">
                                                One driver directly influences another in a unidirectional manner. Changes in the cause lead to predictable effects.
                                            </p>
                                            <p className="text-xs text-purple-200 italic bg-purple-900/30 p-2 rounded">
                                                <span className="font-semibold">Example:</span> Non-Invasive BCI Performance Breakthrough → Public Acceptance
                                                <br />
                                                <span className="text-[10px]">If non-invasive BCIs achieve high performance, public acceptance will likely increase as the barrier to entry (surgery) is removed.</span>
                                            </p>
                                        </div>

                                        {/* Feedback Loop */}
                                        <div className="bg-black/20 p-3 rounded-lg">
                                            <div className="flex items-center gap-2 mb-2">
                                                <svg className="w-8 h-2" viewBox="0 0 32 8">
                                                    <line x1="0" y1="4" x2="32" y2="4" stroke="#fbbf24" strokeWidth="2" strokeDasharray="4,3" />
                                                </svg>
                                                <span className="font-semibold text-yellow-300">Feedback Loop (Dashed Yellow Line)</span>
                                            </div>
                                            <p className="text-xs text-yellow-100 mb-2">
                                                Two drivers influence each other in a bidirectional, mutually reinforcing or balancing cycle. Changes in one affect the other, which feeds back to affect the first.
                                            </p>
                                            <p className="text-xs text-yellow-200 italic bg-yellow-900/20 p-2 rounded">
                                                <span className="font-semibold">Example:</span> Cognitive Enhancement Regulation ↔ Formation of Cognitive Inequality
                                                <br />
                                                <span className="text-[10px]">Regulatory policies shape how inequality emerges, but the observed inequality patterns then influence future regulatory approaches - a continuous cycle.</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-pink-900/30 p-6 rounded-xl border border-pink-500/30">
                                    <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-pink-300">
                                        <Zap className="w-5 h-5" />
                                        Linchpin Drivers Identified
                                    </h3>
                                    <p className="text-sm text-pink-100 mb-3">
                                        Drivers with 2+ connections are highlighted in <span className="font-bold text-pink-300">bright pink</span>. These are the forces that,
                                        if they shift, will create the greatest ripple effects across the entire system.
                                        They are prime candidates for scenario matrix axes.
                                    </p>
                                    <div className="bg-green-900/30 p-3 rounded-lg border border-green-400/30 mt-3">
                                        <p className="text-sm text-green-200">
                                            <span className="font-bold text-green-300">Green gradient nodes</span> indicate our <span className="font-bold">chosen scenario axes</span> -
                                            selected from the linchpin factors for their thematic diversity and strategic value. See Stage 5 for the full rationale.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Key Linchpin Drivers */}
                            <div className="bg-gradient-to-r from-pink-900/30 to-purple-900/30 p-6 rounded-xl border border-pink-500/20">
                                <h3 className="text-xl font-bold mb-4">Strategic Insight: Linchpin Factors</h3>
                                <div className="space-y-3">
                                    {criticalDrivers
                                        .map(driver => ({
                                            ...driver,
                                            connections: driverConnections.filter(c => c.from === driver.id || c.to === driver.id).length
                                        }))
                                        .filter(d => d.connections >= 2)
                                        .sort((a, b) => b.connections - a.connections)
                                        .map(driver => (
                                            <div key={driver.id} className="flex items-center gap-3 bg-black/20 p-3 rounded-lg">
                                                <div className="bg-pink-500 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                                                    {driver.connections}
                                                </div>
                                                <div>
                                                    <p className="font-semibold">{driver.name}</p>
                                                    <p className="text-xs text-gray-300">{driver.category} dimension</p>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>

                            {/* Navigation Button */}
                            <div className="flex justify-center mt-8">
                                <button
                                    onClick={() => setActiveStage(4)}
                                    className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-bold text-lg hover:scale-105 transition-transform shadow-lg"
                                >
                                    Continue to Stage 5: Choosing the Scenario Axes
                                    <ArrowRight className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Dashboard Introduction: Choosing the Axes */}
                    {activeStage === 4 && (
                        <div className="space-y-6">
                            <div className="text-center mb-6">
                                <h2 className="text-3xl font-bold mb-2 text-purple-300">Step 5: Choosing the Scenario Axes</h2>
                                <p className="text-xl text-purple-200">The Strategic Choice: From Linchpins to Axes</p>
                            </div>

                            {/* The Strategic Decision Framework */}
                            <div className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 p-8 rounded-xl border-2 border-purple-400/50">
                                <div className="text-center mb-6">
                                    <AlertCircle className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
                                    <h3 className="text-2xl font-bold text-yellow-300 mb-2">The Critical Teaching Moment</h3>
                                    <p className="text-lg text-purple-100 max-w-3xl mx-auto">
                                        This is not just data analysis—it's <span className="font-bold text-yellow-300">strategic judgment</span>.
                                        There isn't a single "right" answer, but a <span className="font-bold">defensible choice</span> between valid alternatives.
                                    </p>
                                </div>

                                {/* The Debate: Two Valid Options */}
                                <div className="grid md:grid-cols-2 gap-6 mb-6">
                                    {/* Option 1: Data-Driven */}
                                    <div className="bg-blue-900/40 p-6 rounded-xl border-2 border-blue-400/50">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="bg-blue-500 rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold">
                                                1
                                            </div>
                                            <div>
                                                <h4 className="text-xl font-bold text-blue-300">The "Data-Driven" Choice</h4>
                                                <p className="text-xs text-blue-200">Follow the connections map verbatim</p>
                                            </div>
                                        </div>

                                        <div className="space-y-3 text-sm">
                                            <div className="bg-black/20 p-3 rounded-lg">
                                                <p className="font-semibold text-blue-200 mb-2">Proposed Axes:</p>
                                                <ul className="space-y-1 text-blue-100">
                                                    <li>• <span className="font-semibold">Axis 1 (Social):</span> Public Acceptance</li>
                                                    <li>• <span className="font-semibold">Axis 2 (Political):</span> Regulatory Framework</li>
                                                </ul>
                                            </div>

                                            <div className="bg-blue-950/40 p-3 rounded-lg">
                                                <p className="font-semibold text-blue-200 mb-1">The Argument:</p>
                                                <p className="text-xs text-blue-100">
                                                    "Our connections analysis proves these are the two factors with the <span className="font-semibold">most systemic impact</span>.
                                                    They are the strongest linchpins, therefore they should be our axes."
                                                </p>
                                            </div>

                                            <div className="bg-red-900/30 p-3 rounded-lg border border-red-400/30">
                                                <p className="font-semibold text-red-300 mb-1 text-xs">⚠️ The Strategic Challenge:</p>
                                                <p className="text-xs text-red-100">
                                                    Are Social and Political axes <span className="font-semibold">truly diverse enough</span>? They're closely related and might not create
                                                    <span className="font-semibold"> four radically different worlds</span>. Risk of scenarios too narrowly focused on socio-political dynamics.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Option 2: Thematic Diversity (Chosen) */}
                                    <div className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 p-6 rounded-xl border-2 border-green-400/70 shadow-xl">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold">
                                                ✓
                                            </div>
                                            <div>
                                                <h4 className="text-xl font-bold text-green-300">The "Thematic Diversity" Choice</h4>
                                                <p className="text-xs text-green-200">Our selected approach ⭐</p>
                                            </div>
                                        </div>

                                        <div className="space-y-3 text-sm">
                                            <div className="bg-black/20 p-3 rounded-lg ring-2 ring-green-400/50">
                                                <p className="font-semibold text-green-200 mb-2">Our Chosen Axes:</p>
                                                <ul className="space-y-1 text-green-100">
                                                    <li>• <span className="font-semibold">Axis 1 (Social):</span> Public Acceptance</li>
                                                    <li>• <span className="font-semibold">Axis 2 (Technological):</span> Non-Invasive BCI Breakthroughs</li>
                                                </ul>
                                            </div>

                                            <div className="bg-green-950/40 p-3 rounded-lg">
                                                <p className="font-semibold text-green-200 mb-1">The Argument:</p>
                                                <p className="text-xs text-green-100">
                                                    "Keep one socio-political linchpin but <span className="font-semibold">deliberately pair it with a critical Technological uncertainty</span>
                                                    to ensure <span className="font-semibold">maximum thematic diversity</span> and create richer, more distinct scenarios."
                                                </p>
                                            </div>

                                            <div className="bg-green-900/40 p-3 rounded-lg border border-green-300/50">
                                                <p className="font-semibold text-green-200 mb-1 text-xs">✨ The Strategic Power:</p>
                                                <p className="text-xs text-green-100">
                                                    Creates a <span className="font-semibold">powerful creative tension</span> between what is <span className="font-semibold">technologically possible</span>
                                                    and what <span className="font-semibold">society is willing to accept</span>—the ultimate dynamic shaping BCI's future.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Why This Choice is Superior for Teaching */}
                                <div className="bg-purple-900/40 p-5 rounded-xl border border-purple-400/50">
                                    <h4 className="text-lg font-bold text-purple-200 mb-3">Why the Second Approach is More Powerful:</h4>
                                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                                        <div className="bg-black/20 p-4 rounded-lg">
                                            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mb-2 text-lg">1</div>
                                            <p className="font-semibold text-purple-300 mb-1">Honors the Analysis</p>
                                            <p className="text-xs text-purple-100">Keeps the most critical Social uncertainty from our linchpin analysis</p>
                                        </div>
                                        <div className="bg-black/20 p-4 rounded-lg">
                                            <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center mb-2 text-lg">2</div>
                                            <p className="font-semibold text-pink-300 mb-1">Maximum Diversity</p>
                                            <p className="text-xs text-pink-100">Social + Technological = broader, more challenging scenario space</p>
                                        </div>
                                        <div className="bg-black/20 p-4 rounded-lg">
                                            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mb-2 text-lg">3</div>
                                            <p className="font-semibold text-green-300 mb-1">Creative Tension</p>
                                            <p className="text-xs text-green-100">Tech capability vs. social readiness creates four truly distinct worlds</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* The Chosen Axes Detailed */}
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Axis 1: Social */}
                                <div className="bg-gradient-to-br from-pink-900/40 to-purple-900/40 p-6 rounded-xl border-2 border-pink-400/50">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg p-3">
                                            <span className="text-2xl">👥</span>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-pink-300">Axis 1: Social Dimension</h3>
                                            <p className="text-sm text-pink-200">{chosenAxes.axis1.dimension}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="bg-black/30 p-3 rounded-lg">
                                            <p className="font-semibold text-pink-200 mb-1 text-sm">Factor Name:</p>
                                            <p className="text-white font-semibold">{chosenAxes.axis1.name}</p>
                                        </div>

                                        <div className="bg-black/30 p-3 rounded-lg">
                                            <p className="font-semibold text-pink-200 mb-1 text-sm">Description:</p>
                                            <p className="text-sm text-purple-100">{chosenAxes.axis1.description}</p>
                                        </div>

                                        <div className="bg-gradient-to-r from-red-900/40 to-green-900/40 p-4 rounded-lg">
                                            <p className="font-semibold text-center text-purple-200 mb-3 text-sm">The Spectrum:</p>
                                            <div className="flex items-center justify-between gap-2">
                                                <div className="flex-1 bg-red-900/50 p-3 rounded-lg border border-red-400/50">
                                                    <p className="text-xs text-gray-300 mb-1">Low Extreme:</p>
                                                    <p className="font-bold text-sm text-red-300">{chosenAxes.axis1.lowExtreme}</p>
                                                </div>
                                                <div className="text-2xl text-purple-300">↔</div>
                                                <div className="flex-1 bg-green-900/50 p-3 rounded-lg border border-green-400/50">
                                                    <p className="text-xs text-gray-300 mb-1">High Extreme:</p>
                                                    <p className="font-bold text-sm text-green-300">{chosenAxes.axis1.highExtreme}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-pink-950/40 p-3 rounded-lg border border-pink-400/30">
                                            <p className="font-semibold text-pink-300 mb-1 text-xs">Why This Axis:</p>
                                            <p className="text-xs text-pink-100">
                                                Highest-ranked <span className="font-semibold">Social linchpin</span> from our connections analysis.
                                                Public acceptance determines whether BCI technology can transition from medical niche to societal norm.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Axis 2: Technological */}
                                <div className="bg-gradient-to-br from-green-900/40 to-blue-900/40 p-6 rounded-xl border-2 border-green-400/50">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="bg-gradient-to-br from-green-500 to-blue-500 rounded-lg p-3">
                                            <span className="text-2xl">⚡</span>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-green-300">Axis 2: Technological Dimension</h3>
                                            <p className="text-sm text-green-200">{chosenAxes.axis2.dimension}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="bg-black/30 p-3 rounded-lg">
                                            <p className="font-semibold text-green-200 mb-1 text-sm">Factor Name:</p>
                                            <p className="text-white font-semibold">{chosenAxes.axis2.name}</p>
                                        </div>

                                        <div className="bg-black/30 p-3 rounded-lg">
                                            <p className="font-semibold text-green-200 mb-1 text-sm">Description:</p>
                                            <p className="text-sm text-blue-100">{chosenAxes.axis2.description}</p>
                                        </div>

                                        <div className="bg-gradient-to-r from-orange-900/40 to-green-900/40 p-4 rounded-lg">
                                            <p className="font-semibold text-center text-blue-200 mb-3 text-sm">The Spectrum:</p>
                                            <div className="flex items-center justify-between gap-2">
                                                <div className="flex-1 bg-orange-900/50 p-3 rounded-lg border border-orange-400/50">
                                                    <p className="text-xs text-gray-300 mb-1">Low Extreme:</p>
                                                    <p className="font-bold text-sm text-orange-300">{chosenAxes.axis2.lowExtreme}</p>
                                                </div>
                                                <div className="text-2xl text-blue-300">↔</div>
                                                <div className="flex-1 bg-green-900/50 p-3 rounded-lg border border-green-400/50">
                                                    <p className="text-xs text-gray-300 mb-1">High Extreme:</p>
                                                    <p className="font-bold text-sm text-green-300">{chosenAxes.axis2.highExtreme}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-green-950/40 p-3 rounded-lg border border-green-400/30">
                                            <p className="font-semibold text-green-300 mb-1 text-xs">Why This Axis:</p>
                                            <p className="text-xs text-green-100">
                                                Highest-ranked <span className="font-semibold">Technological uncertainty</span> overall (#1 combined score).
                                                Non-invasive breakthroughs would eliminate the main barrier (surgery), fundamentally reshaping the market and society's relationship with BCIs.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* The Punchline: Teaching Strategic Judgment */}
                            <div className="bg-gradient-to-br from-yellow-900/40 to-orange-900/40 p-6 rounded-xl border-2 border-yellow-400/60">
                                <div className="flex items-start gap-4">
                                    <div className="bg-yellow-500 rounded-full p-3 flex-shrink-0">
                                        <Brain className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-yellow-300 mb-3">The Key Lesson for Your Project:</h3>
                                        <div className="space-y-2 text-sm text-yellow-100">
                                            <p className="bg-black/20 p-3 rounded-lg">
                                                <span className="font-semibold text-yellow-200">There wasn't a single "right" answer.</span> It was a <span className="font-semibold">strategic choice</span> between
                                                following the data from the connections map verbatim or deliberately choosing more diverse axes to create richer scenarios.
                                            </p>
                                            <p className="bg-black/20 p-3 rounded-lg">
                                                <span className="font-semibold text-yellow-200">Both approaches are defensible.</span> The "data-driven" choice honors pure analytical rigor.
                                                The "thematic diversity" choice optimizes for strategic insight and scenario distinctiveness.
                                            </p>
                                            <p className="bg-yellow-900/50 p-4 rounded-lg border-2 border-yellow-400/50 font-semibold text-white">
                                                🎯 For your project, the most important thing is to <span className="text-yellow-300">show us your logic and robustly justify your final choice</span>.
                                                The framework is a tool to aid thinking, not a machine that produces a predetermined answer.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Next Step Preview */}
                            <div className="bg-purple-900/30 p-5 rounded-xl border border-purple-400/30 text-center">
                                <p className="text-purple-200 text-sm">
                                    <span className="font-semibold text-purple-300">Next:</span> In Stages 6-8, we'll build four scenario narratives from these two axes,
                                    assess their impact on our business, and deliver a verdict on strategic preparedness.
                                </p>
                            </div>

                            {/* Navigation Button */}
                            <div className="flex justify-center mt-8">
                                <button
                                    onClick={() => setActiveStage(5)}
                                    className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-bold text-lg hover:scale-105 transition-transform shadow-lg"
                                >
                                    Continue to Stage 6: Crafting Scenario Narratives
                                    <ArrowRight className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Dashboard Introduction: Scenario Narratives */}
                    {activeStage === 5 && (
                        <div className="space-y-8">
                            {/* Stage Header */}
                            <div className="text-center space-y-4">
                                <div className="inline-block bg-gradient-to-r from-cyan-500 to-blue-500 p-4 rounded-2xl">
                                    <Globe className="w-12 h-12" />
                                </div>
                                <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                                    Stage 6: Crafting Scenario Narratives
                                </h2>
                                <p className="text-xl text-cyan-200 max-w-4xl mx-auto">
                                    Building four distinct and plausible future worlds from our chosen axes
                                </p>
                            </div>

                            {/* The 2x2 Scenario Matrix */}
                            <div className="bg-gradient-to-br from-cyan-900/40 to-blue-900/40 p-6 rounded-xl border-2 border-cyan-400/30">
                                <h3 className="text-2xl font-bold text-cyan-300 mb-12 text-center">The Scenario Matrix</h3>

                                {/* Matrix Visualization */}
                                <div className="relative bg-black/20 p-16 rounded-lg">
                                    <div className="grid grid-cols-2 gap-6 relative z-10">
                                        {/* Scenario 3: Top-Left */}
                                        <div className="bg-gradient-to-br from-purple-600/30 to-purple-800/30 p-6 rounded-xl border-2 border-purple-400/50 hover:scale-105 transition-transform cursor-pointer">
                                            <div className="flex items-start gap-3 mb-3">
                                                <div className="bg-purple-500 p-2 rounded-lg">
                                                    <Brain className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <h4 className="text-xl font-bold text-purple-300">{scenarios.scenario3.name}</h4>
                                                    <p className="text-xs text-purple-200 italic">{scenarios.scenario3.tagline}</p>
                                                </div>
                                            </div>
                                            <p className="text-sm text-purple-100 font-semibold mb-2">{scenarios.scenario3.position}</p>
                                            <p className="text-xs text-purple-200">{scenarios.scenario3.worldDescription.substring(0, 150)}...</p>
                                        </div>

                                        {/* Scenario 4: Top-Right */}
                                        <div className="bg-gradient-to-br from-green-600/30 to-emerald-800/30 p-6 rounded-xl border-2 border-green-400/50 hover:scale-105 transition-transform cursor-pointer">
                                            <div className="flex items-start gap-3 mb-3">
                                                <div className="bg-green-500 p-2 rounded-lg">
                                                    <Brain className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <h4 className="text-xl font-bold text-green-300">{scenarios.scenario4.name}</h4>
                                                    <p className="text-xs text-green-200 italic">{scenarios.scenario4.tagline}</p>
                                                </div>
                                            </div>
                                            <p className="text-sm text-green-100 font-semibold mb-2">{scenarios.scenario4.position}</p>
                                            <p className="text-xs text-green-200">{scenarios.scenario4.worldDescription.substring(0, 150)}...</p>
                                        </div>

                                        {/* Scenario 1: Bottom-Left */}
                                        <div className="bg-gradient-to-br from-blue-600/30 to-indigo-800/30 p-6 rounded-xl border-2 border-blue-400/50 hover:scale-105 transition-transform cursor-pointer">
                                            <div className="flex items-start gap-3 mb-3">
                                                <div className="bg-blue-500 p-2 rounded-lg">
                                                    <Brain className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <h4 className="text-xl font-bold text-blue-300">{scenarios.scenario1.name}</h4>
                                                    <p className="text-xs text-blue-200 italic">{scenarios.scenario1.tagline}</p>
                                                </div>
                                            </div>
                                            <p className="text-sm text-blue-100 font-semibold mb-2">{scenarios.scenario1.position}</p>
                                            <p className="text-xs text-blue-200">{scenarios.scenario1.worldDescription.substring(0, 150)}...</p>
                                        </div>

                                        {/* Scenario 2: Bottom-Right */}
                                        <div className="bg-gradient-to-br from-orange-600/30 to-red-800/30 p-6 rounded-xl border-2 border-orange-400/50 hover:scale-105 transition-transform cursor-pointer">
                                            <div className="flex items-start gap-3 mb-3">
                                                <div className="bg-orange-500 p-2 rounded-lg">
                                                    <Brain className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <h4 className="text-xl font-bold text-orange-300">{scenarios.scenario2.name}</h4>
                                                    <p className="text-xs text-orange-200 italic">{scenarios.scenario2.tagline}</p>
                                                </div>
                                            </div>
                                            <p className="text-sm text-orange-100 font-semibold mb-2">{scenarios.scenario2.position}</p>
                                            <p className="text-xs text-orange-200">{scenarios.scenario2.worldDescription.substring(0, 150)}...</p>
                                        </div>
                                    </div>

                                    {/* Axis Labels */}
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4">
                                        <div className="bg-cyan-600 px-4 py-2 rounded-lg text-sm font-bold">
                                            ↑ {chosenAxes.axis1.highExtreme}
                                        </div>
                                    </div>
                                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-4">
                                        <div className="bg-cyan-600 px-4 py-2 rounded-lg text-sm font-bold">
                                            ↓ {chosenAxes.axis1.lowExtreme}
                                        </div>
                                    </div>
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-10">
                                        <div className="bg-blue-600 px-3 py-2 rounded-lg text-xs font-bold -rotate-90 whitespace-nowrap">
                                            ← {chosenAxes.axis2.lowExtreme}
                                        </div>
                                    </div>
                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16">
                                        <div className="bg-blue-600 px-3 py-2 rounded-lg text-xs font-bold -rotate-90 whitespace-nowrap">
                                            {chosenAxes.axis2.highExtreme} →
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Detailed Scenario Narratives */}
                            <div className="space-y-8">
                                {/* Scenario 1: The Hesitant Dawn */}
                                <div className="bg-gradient-to-br from-blue-900/40 to-indigo-900/40 p-8 rounded-xl border-2 border-blue-400/30">
                                    <div className="flex items-start gap-4 mb-6">
                                        <div className="bg-blue-500 p-3 rounded-xl">
                                            <Brain className="w-10 h-10" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-3xl font-bold text-blue-300 mb-2">{scenarios.scenario1.name}</h3>
                                            <p className="text-lg text-blue-200 italic mb-3">{scenarios.scenario1.tagline}</p>
                                            <div className="flex gap-4 text-sm">
                                                <span className="bg-blue-800/50 px-3 py-1 rounded-full">{scenarios.scenario1.year}</span>
                                                <span className="bg-blue-800/50 px-3 py-1 rounded-full">{scenarios.scenario1.narrativeType}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                                        <div className="bg-black/20 p-4 rounded-lg">
                                            <h4 className="font-bold text-blue-300 mb-2">Primary Factors:</h4>
                                            <ul className="space-y-1 text-sm text-blue-100">
                                                {scenarios.scenario1.primaryFactors.map((factor, idx) => (
                                                    <li key={idx}>• {factor}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="bg-black/20 p-4 rounded-lg">
                                            <h4 className="font-bold text-blue-300 mb-2">Secondary Factors:</h4>
                                            <ul className="space-y-1 text-sm text-blue-100">
                                                {scenarios.scenario1.secondaryFactors.map((factor, idx) => (
                                                    <li key={idx}>• {factor}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Newspaper Headlines */}
                                    <div className="bg-white/95 p-6 rounded-lg text-gray-900 mb-6">
                                        <h4 className="text-2xl font-bold mb-4 text-center border-b-2 border-gray-300 pb-2">
                                            {scenarios.scenario1.year} News Headlines
                                        </h4>
                                        <div className="space-y-4">
                                            {scenarios.scenario1.headlines.map((headline, idx) => (
                                                <div key={idx} className="border-l-4 border-blue-600 pl-4 py-2">
                                                    <div className="flex justify-between items-center mb-1">
                                                        <span className="font-bold text-sm text-blue-700">{headline.outlet}</span>
                                                        <span className="text-xs text-gray-600">{headline.date}</span>
                                                    </div>
                                                    <p className="text-sm font-medium">{headline.text}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="bg-black/30 p-6 rounded-lg mb-6">
                                        <h4 className="font-bold text-blue-300 mb-3">World Description:</h4>
                                        <p className="text-sm text-blue-100 leading-relaxed">{scenarios.scenario1.worldDescription}</p>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="bg-black/20 p-4 rounded-lg">
                                            <h4 className="font-bold text-blue-300 mb-2">Key Statistics:</h4>
                                            <ul className="space-y-1 text-xs text-blue-100">
                                                {scenarios.scenario1.keyStatistics.map((stat, idx) => (
                                                    <li key={idx}>• {stat}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="bg-black/20 p-4 rounded-lg">
                                            <h4 className="font-bold text-blue-300 mb-2">Expected Trends (From Stage 2):</h4>
                                            <ul className="space-y-1 text-xs text-blue-100">
                                                {scenarios.scenario1.expectedTrends.map((trend, idx) => (
                                                    <li key={idx}>• {trend}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {/* Scenario 2: The Forbidden Frontier */}
                                <div className="bg-gradient-to-br from-orange-900/40 to-red-900/40 p-8 rounded-xl border-2 border-orange-400/30">
                                    <div className="flex items-start gap-4 mb-6">
                                        <div className="bg-orange-500 p-3 rounded-xl">
                                            <Brain className="w-10 h-10" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-3xl font-bold text-orange-300 mb-2">{scenarios.scenario2.name}</h3>
                                            <p className="text-lg text-orange-200 italic mb-3">{scenarios.scenario2.tagline}</p>
                                            <div className="flex gap-4 text-sm">
                                                <span className="bg-orange-800/50 px-3 py-1 rounded-full">{scenarios.scenario2.year}</span>
                                                <span className="bg-orange-800/50 px-3 py-1 rounded-full">{scenarios.scenario2.narrativeType}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                                        <div className="bg-black/20 p-4 rounded-lg">
                                            <h4 className="font-bold text-orange-300 mb-2">Primary Factors:</h4>
                                            <ul className="space-y-1 text-sm text-orange-100">
                                                {scenarios.scenario2.primaryFactors.map((factor, idx) => (
                                                    <li key={idx}>• {factor}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="bg-black/20 p-4 rounded-lg">
                                            <h4 className="font-bold text-orange-300 mb-2">Secondary Factors:</h4>
                                            <ul className="space-y-1 text-sm text-orange-100">
                                                {scenarios.scenario2.secondaryFactors.map((factor, idx) => (
                                                    <li key={idx}>• {factor}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Social Media Thread */}
                                    <div className="bg-white/95 p-6 rounded-lg mb-6 text-gray-900">
                                        <h4 className="text-2xl font-bold mb-4 text-center text-orange-700">
                                            Social Media Thread - {scenarios.scenario2.year}
                                        </h4>
                                        <div className="space-y-4 max-h-96 overflow-y-auto">
                                            {scenarios.scenario2.thread.map((tweet, idx) => (
                                                <div key={idx} className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-600">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center font-bold text-white">
                                                            {tweet.handle.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-gray-900">{tweet.handle}</p>
                                                            <p className="text-xs text-gray-600">{tweet.user} • {tweet.timestamp}</p>
                                                        </div>
                                                    </div>
                                                    <p className="text-sm text-gray-800 mb-2">{tweet.text}</p>
                                                    <div className="flex gap-4 text-xs text-gray-600">
                                                        <span>❤️ {tweet.likes}</span>
                                                        <span>🔁 {tweet.retweets}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="bg-black/30 p-6 rounded-lg mb-6">
                                        <h4 className="font-bold text-orange-300 mb-3">World Description:</h4>
                                        <p className="text-sm text-orange-100 leading-relaxed">{scenarios.scenario2.worldDescription}</p>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="bg-black/20 p-4 rounded-lg">
                                            <h4 className="font-bold text-orange-300 mb-2">Key Statistics:</h4>
                                            <ul className="space-y-1 text-xs text-orange-100">
                                                {scenarios.scenario2.keyStatistics.map((stat, idx) => (
                                                    <li key={idx}>• {stat}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="bg-black/20 p-4 rounded-lg">
                                            <h4 className="font-bold text-orange-300 mb-2">Expected Trends (From Stage 2):</h4>
                                            <ul className="space-y-1 text-xs text-orange-100">
                                                {scenarios.scenario2.expectedTrends.map((trend, idx) => (
                                                    <li key={idx}>• {trend}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {/* Scenario 3: The Waiting World */}
                                <div className="bg-gradient-to-br from-purple-900/40 to-violet-900/40 p-8 rounded-xl border-2 border-purple-400/30">
                                    <div className="flex items-start gap-4 mb-6">
                                        <div className="bg-purple-500 p-3 rounded-xl">
                                            <Brain className="w-10 h-10" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-3xl font-bold text-purple-300 mb-2">{scenarios.scenario3.name}</h3>
                                            <p className="text-lg text-purple-200 italic mb-3">{scenarios.scenario3.tagline}</p>
                                            <div className="flex gap-4 text-sm">
                                                <span className="bg-purple-800/50 px-3 py-1 rounded-full">{scenarios.scenario3.year}</span>
                                                <span className="bg-purple-800/50 px-3 py-1 rounded-full">{scenarios.scenario3.narrativeType}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                                        <div className="bg-black/20 p-4 rounded-lg">
                                            <h4 className="font-bold text-purple-300 mb-2">Primary Factors:</h4>
                                            <ul className="space-y-1 text-sm text-purple-100">
                                                {scenarios.scenario3.primaryFactors.map((factor, idx) => (
                                                    <li key={idx}>• {factor}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="bg-black/20 p-4 rounded-lg">
                                            <h4 className="font-bold text-purple-300 mb-2">Secondary Factors:</h4>
                                            <ul className="space-y-1 text-sm text-purple-100">
                                                {scenarios.scenario3.secondaryFactors.map((factor, idx) => (
                                                    <li key={idx}>• {factor}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    {/* CEO Memo */}
                                    <div className="bg-white/95 p-6 rounded-lg text-gray-900 mb-6">
                                        <div className="border-b-2 border-gray-300 pb-3 mb-4">
                                            <h4 className="text-xl font-bold text-purple-900">MEMORANDUM</h4>
                                            <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                                                <div><span className="font-semibold">From:</span> {scenarios.scenario3.memo.from}</div>
                                                <div><span className="font-semibold">Date:</span> {scenarios.scenario3.memo.date}</div>
                                                <div className="col-span-2"><span className="font-semibold">To:</span> {scenarios.scenario3.memo.to}</div>
                                                <div className="col-span-2"><span className="font-semibold">Subject:</span> {scenarios.scenario3.memo.subject}</div>
                                            </div>
                                        </div>
                                        <div
                                            className="text-sm leading-relaxed max-h-96 overflow-y-auto whitespace-pre-line"
                                            dangerouslySetInnerHTML={{ __html: convertMarkdownToHtml(scenarios.scenario3.memo.body) }}
                                        />
                                    </div>

                                    <div className="bg-black/30 p-6 rounded-lg mb-6">
                                        <h4 className="font-bold text-purple-300 mb-3">World Description:</h4>
                                        <p className="text-sm text-purple-100 leading-relaxed">{scenarios.scenario3.worldDescription}</p>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="bg-black/20 p-4 rounded-lg">
                                            <h4 className="font-bold text-purple-300 mb-2">Key Statistics:</h4>
                                            <ul className="space-y-1 text-xs text-purple-100">
                                                {scenarios.scenario3.keyStatistics.map((stat, idx) => (
                                                    <li key={idx}>• {stat}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="bg-black/20 p-4 rounded-lg">
                                            <h4 className="font-bold text-purple-300 mb-2">Expected Trends (From Stage 2):</h4>
                                            <ul className="space-y-1 text-xs text-purple-100">
                                                {scenarios.scenario3.expectedTrends.map((trend, idx) => (
                                                    <li key={idx}>• {trend}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {/* Scenario 4: The Augmented Age */}
                                <div className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 p-8 rounded-xl border-2 border-green-400/30">
                                    <div className="flex items-start gap-4 mb-6">
                                        <div className="bg-green-500 p-3 rounded-xl">
                                            <Brain className="w-10 h-10" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-3xl font-bold text-green-300 mb-2">{scenarios.scenario4.name}</h3>
                                            <p className="text-lg text-green-200 italic mb-3">{scenarios.scenario4.tagline}</p>
                                            <div className="flex gap-4 text-sm">
                                                <span className="bg-green-800/50 px-3 py-1 rounded-full">{scenarios.scenario4.year}</span>
                                                <span className="bg-green-800/50 px-3 py-1 rounded-full">{scenarios.scenario4.narrativeType}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                                        <div className="bg-black/20 p-4 rounded-lg">
                                            <h4 className="font-bold text-green-300 mb-2">Primary Factors:</h4>
                                            <ul className="space-y-1 text-sm text-green-100">
                                                {scenarios.scenario4.primaryFactors.map((factor, idx) => (
                                                    <li key={idx}>• {factor}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="bg-black/20 p-4 rounded-lg">
                                            <h4 className="font-bold text-green-300 mb-2">Secondary Factors:</h4>
                                            <ul className="space-y-1 text-sm text-green-100">
                                                {scenarios.scenario4.secondaryFactors.map((factor, idx) => (
                                                    <li key={idx}>• {factor}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Day in the Life Narrative */}
                                    <div className="bg-white/95 p-6 rounded-lg mb-6 text-gray-900">
                                        <h4 className="text-2xl font-bold mb-4 text-center text-green-700">
                                            A Day in the Life - {scenarios.scenario4.year}
                                        </h4>
                                        <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded-lg mb-4 text-sm">
                                            <p><span className="font-bold text-green-800">Character:</span> {scenarios.scenario4.character.name}, {scenarios.scenario4.character.age}</p>
                                            <p><span className="font-bold text-green-800">Profession:</span> {scenarios.scenario4.character.profession}</p>
                                            <p><span className="font-bold text-green-800">Location:</span> {scenarios.scenario4.character.location}</p>
                                            <p><span className="font-bold text-green-800">BCI Device:</span> {scenarios.scenario4.character.bciType}</p>
                                        </div>
                                        <div
                                            className="text-sm leading-relaxed max-h-96 overflow-y-auto whitespace-pre-line"
                                            dangerouslySetInnerHTML={{ __html: convertMarkdownToHtml(scenarios.scenario4.narrative) }}
                                        />
                                    </div>

                                    <div className="bg-black/30 p-6 rounded-lg mb-6">
                                        <h4 className="font-bold text-green-300 mb-3">World Description:</h4>
                                        <p className="text-sm text-green-100 leading-relaxed">{scenarios.scenario4.worldDescription}</p>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="bg-black/20 p-4 rounded-lg">
                                            <h4 className="font-bold text-green-300 mb-2">Key Statistics:</h4>
                                            <ul className="space-y-1 text-xs text-green-100">
                                                {scenarios.scenario4.keyStatistics.map((stat, idx) => (
                                                    <li key={idx}>• {stat}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="bg-black/20 p-4 rounded-lg">
                                            <h4 className="font-bold text-green-300 mb-2">Expected Trends (From Stage 2):</h4>
                                            <ul className="space-y-1 text-xs text-green-100">
                                                {scenarios.scenario4.expectedTrends.map((trend, idx) => (
                                                    <li key={idx}>• {trend}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Key Insights Box */}
                            <div className="bg-gradient-to-br from-yellow-900/40 to-amber-900/40 p-6 rounded-xl border-2 border-yellow-400/30">
                                <div className="flex items-start gap-4">
                                    <div className="bg-yellow-500 p-3 rounded-xl">
                                        <Lightbulb className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-yellow-300 mb-3">Key Teaching Points for Your Project:</h3>
                                        <div className="space-y-2 text-sm text-yellow-100">
                                            <p className="bg-black/20 p-3 rounded-lg">
                                                <span className="font-semibold text-yellow-200">Distinct Worlds:</span> Notice how each scenario feels fundamentally different.
                                                That's the power of choosing diverse axes—you create truly distinct strategic challenges.
                                            </p>
                                            <p className="bg-black/20 p-3 rounded-lg">
                                                <span className="font-semibold text-yellow-200">Storytelling Techniques:</span> We used different narrative formats
                                                (news headlines, social media, CEO memo, day-in-the-life) to bring each world alive. Choose formats that best convey each scenario's essence.
                                            </p>
                                            <p className="bg-black/20 p-3 rounded-lg">
                                                <span className="font-semibold text-yellow-200">Incorporating Expected Trends:</span> Each scenario includes the "Critical Planning Issues"
                                                from Stage 2 (aging demographics, healthcare costs, etc.)—these are impactful but certain, not uncertainties.
                                            </p>
                                            <p className="bg-yellow-900/50 p-4 rounded-lg border-2 border-yellow-400/50 font-semibold text-white">
                                                🎯 Notice what's NOT in these narratives: organizational impact. That's deliberate. Scenarios describe <span className="text-yellow-300">the world</span>,
                                                not your company. The impact assessment comes in Stage 7.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Next Step Preview */}
                            <div className="bg-purple-900/30 p-5 rounded-xl border border-purple-400/30 text-center">
                                <p className="text-purple-200 text-sm">
                                    <span className="font-semibold text-purple-300">Next:</span> In Stage 7, we'll assess the impact of each scenario on our business
                                    and deliver a final verdict on strategic preparedness.
                                </p>
                            </div>

                            {/* Navigation Button */}
                            <div className="flex justify-center mt-8">
                                <button
                                    onClick={() => setActiveStage(6)}
                                    className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-bold text-lg hover:scale-105 transition-transform shadow-lg"
                                >
                                    Continue to Stage 7: Assess the Impact of Scenarios
                                    <ArrowRight className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Dashboard Introduction: Impact Assessment (Stage 7 in slides) */}
                    {activeStage === 6 && (
                        <div className="space-y-8">
                            {/* Stage Header */}
                            <div className="text-center space-y-4">
                                <div className="inline-block bg-gradient-to-r from-orange-500 to-red-500 p-4 rounded-2xl">
                                    <Target className="w-12 h-12" />
                                </div>
                                <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
                                    Stage 7: Assess the Impact of Scenarios
                                </h2>
                                <p className="text-xl text-orange-200 max-w-4xl mx-auto">
                                    Using scenarios as a 'wind tunnel' to stress-test our strategic readiness
                                </p>
                            </div>

                            {/* Overview: The Wind Tunnel Concept */}
                            <div className="bg-gradient-to-br from-orange-900/40 to-red-900/40 p-6 rounded-xl border-2 border-orange-400/30">
                                <div className="flex items-start gap-4">
                                    <div className="bg-orange-500 p-3 rounded-xl">
                                        <BarChart3 className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-orange-300 mb-3">The Wind Tunnel Methodology</h3>
                                        <p className="text-orange-100 mb-4">
                                            Just as engineers test aircraft designs in wind tunnels, we must test our business strategy against each future scenario.
                                            For each world, we assess:
                                        </p>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="bg-black/20 p-4 rounded-lg">
                                                <h4 className="font-bold text-orange-300 mb-2 flex items-center gap-2">
                                                    <Globe className="w-5 h-5" />
                                                    External Impact
                                                </h4>
                                                <p className="text-sm text-orange-100">How would the rules of the game shift at the industry level?</p>
                                            </div>
                                            <div className="bg-black/20 p-4 rounded-lg">
                                                <h4 className="font-bold text-orange-300 mb-2 flex items-center gap-2">
                                                    <Shield className="w-5 h-5" />
                                                    Internal Impact
                                                </h4>
                                                <p className="text-sm text-orange-100">How would our capabilities, strengths, and weaknesses change?</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Pedagogical Note: Early Warning Indicators */}
                            <div className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 p-6 rounded-xl border-2 border-purple-400/30">
                                <div className="flex items-start gap-4">
                                    <div className="bg-purple-500 p-3 rounded-xl flex-shrink-0">
                                        <AlertCircle className="w-8 h-8" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-3">
                                            <h3 className="text-2xl font-bold text-purple-300">Pedagogical Note: Early Warning Indicators</h3>
                                            <span className="px-3 py-1 bg-purple-500/30 rounded-full text-xs font-semibold text-purple-200 border border-purple-400/50">
                                                Topic 4 Preview
                                            </span>
                                        </div>
                                        <p className="text-purple-100 mb-4">
                                            While we explore Early Warning Indicators (EWIs) in depth in <span className="font-bold text-purple-200">Topic 4: Strategy Development</span>, they are included here to show how scenario planning directly connects to strategic action. EWIs answer a critical question: <span className="italic font-semibold text-purple-200">"How will we know when the future is starting to arrive?"</span>
                                        </p>
                                        <div className="bg-black/30 p-4 rounded-lg mb-4">
                                            <h4 className="font-bold text-purple-200 mb-2">What are Early Warning Indicators?</h4>
                                            <p className="text-sm text-purple-100 mb-3">
                                                EWIs are <span className="font-semibold">specific, measurable metrics</span> that signal which scenario is beginning to emerge in reality. They are the triggers for your bigger, long-term strategic moves.
                                            </p>
                                            <div className="grid md:grid-cols-2 gap-3 text-sm">
                                                <div className="bg-black/20 p-3 rounded">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                                                        <span className="font-semibold text-purple-200">Good EWI Example:</span>
                                                    </div>
                                                    <p className="text-purple-100 pl-6">"FDA approval rate for BCI devices exceeds <span className="font-bold">20 per year</span> for two consecutive years"</p>
                                                </div>
                                                <div className="bg-black/20 p-3 rounded">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                                                        <span className="font-semibold text-purple-200">Poor EWI Example:</span>
                                                    </div>
                                                    <p className="text-purple-100 pl-6">"Increased competition in the market" <span className="italic">(too vague, not measurable)</span></p>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-sm text-purple-200 italic">
                                            Below, you will see EWIs defined for each scenario. In Topic 4, you will learn how to integrate these into a comprehensive strategy development plan.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Scenario-by-Scenario Analysis */}
                            <div className="space-y-6">
                                <h3 className="text-2xl font-bold text-center text-orange-300">Impact Analysis by Scenario</h3>

                                {/* Scenario 1: The Therapeutic Bottleneck */}
                                <div className="bg-gradient-to-br from-blue-900/40 to-indigo-900/40 p-6 rounded-xl border-2 border-blue-400/30">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="bg-blue-500 p-3 rounded-xl">
                                            <Brain className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <h4 className="text-2xl font-bold text-blue-300">{scenarios.scenario1.name}</h4>
                                            <p className="text-sm text-blue-200 italic">{scenarios.scenario1.tagline}</p>
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        {/* External Impact */}
                                        <div className="space-y-4">
                                            <div className="group relative">
                                                <h5 className="text-lg font-bold text-blue-300 flex items-center gap-2 cursor-help">
                                                    <Globe className="w-6 h-6" />
                                                    External Impact: Industry Dynamics
                                                    <span className="ml-1 text-xs text-blue-400">ⓘ</span>
                                                </h5>
                                                {/* Tooltip */}
                                                <div className="absolute left-0 top-full mt-2 w-80 bg-gray-900 text-white text-xs p-3 rounded-lg shadow-xl border border-blue-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                                                    <span className="font-semibold text-blue-300">What this analyzes:</span> How this scenario reshapes the competitive landscape using Porter's 6 Forces. Compare present vs. future to identify which industry dynamics intensify, weaken, or shift—revealing strategic threats and opportunities external to your organization.
                                                </div>
                                            </div>

                                            <div className="bg-black/30 p-4 rounded-lg">
                                                <p className="text-base font-bold text-blue-200 mb-3">Porter's 6 Forces Analysis:</p>

                                                {/* Radar Chart */}
                                                <div className="flex justify-center mb-4">
                                                    <svg viewBox="0 0 400 380" className="w-full h-80">
                                                        {/* Background circles */}
                                                        <circle cx="200" cy="190" r="120" fill="none" stroke="#4a5568" strokeWidth="0.5" opacity="0.3" />
                                                        <circle cx="200" cy="190" r="90" fill="none" stroke="#4a5568" strokeWidth="0.5" opacity="0.3" />
                                                        <circle cx="200" cy="190" r="60" fill="none" stroke="#4a5568" strokeWidth="0.5" opacity="0.3" />
                                                        <circle cx="200" cy="190" r="30" fill="none" stroke="#4a5568" strokeWidth="0.5" opacity="0.3" />

                                                        {/* Axis lines */}
                                                        <line x1="200" y1="190" x2="200" y2="70" stroke="#6b7280" strokeWidth="1" />
                                                        <line x1="200" y1="190" x2="304" y2="133" stroke="#6b7280" strokeWidth="1" />
                                                        <line x1="200" y1="190" x2="304" y2="247" stroke="#6b7280" strokeWidth="1" />
                                                        <line x1="200" y1="190" x2="200" y2="310" stroke="#6b7280" strokeWidth="1" />
                                                        <line x1="200" y1="190" x2="96" y2="247" stroke="#6b7280" strokeWidth="1" />
                                                        <line x1="200" y1="190" x2="96" y2="133" stroke="#6b7280" strokeWidth="1" />

                                                        {/* Present (2025) polygon - Orange */}
                                                        <polygon
                                                            points="200,118 242,154 260,208 200,238 140,208 158,154"
                                                            fill="#fb923c"
                                                            fillOpacity="0.25"
                                                            stroke="#fb923c"
                                                            strokeWidth="2"
                                                            strokeDasharray="5,3"
                                                        />

                                                        {/* Scenario 1: The Hesitant Dawn (2035) - Blue */}
                                                        <polygon
                                                            points="200,154 266,145 284,235 200,274 116,235 134,145"
                                                            fill="#60a5fa"
                                                            fillOpacity="0.35"
                                                            stroke="#60a5fa"
                                                            strokeWidth="2.5"
                                                        />

                                                        {/* Labels */}
                                                        <text x="200" y="55" textAnchor="middle" fill="#93c5fd" fontSize="10" fontWeight="bold">Threat of</text>
                                                        <text x="200" y="67" textAnchor="middle" fill="#93c5fd" fontSize="10" fontWeight="bold">New Entrants</text>

                                                        <text x="315" y="128" textAnchor="start" fill="#93c5fd" fontSize="10" fontWeight="bold">Supplier</text>
                                                        <text x="315" y="140" textAnchor="start" fill="#93c5fd" fontSize="10" fontWeight="bold">Power</text>

                                                        <text x="315" y="247" textAnchor="start" fill="#93c5fd" fontSize="10" fontWeight="bold">Buyer</text>
                                                        <text x="315" y="259" textAnchor="start" fill="#93c5fd" fontSize="10" fontWeight="bold">Power</text>

                                                        <text x="200" y="330" textAnchor="middle" fill="#93c5fd" fontSize="10" fontWeight="bold">Threat of</text>
                                                        <text x="200" y="342" textAnchor="middle" fill="#93c5fd" fontSize="10" fontWeight="bold">Substitutes</text>

                                                        <text x="85" y="247" textAnchor="end" fill="#93c5fd" fontSize="10" fontWeight="bold">Competitive</text>
                                                        <text x="85" y="259" textAnchor="end" fill="#93c5fd" fontSize="10" fontWeight="bold">Rivalry</text>

                                                        <text x="85" y="133" textAnchor="end" fill="#93c5fd" fontSize="10" fontWeight="bold">Complementors</text>

                                                        {/* Center label */}
                                                        <text x="200" y="193" textAnchor="middle" fill="#9ca3af" fontSize="9">Low</text>
                                                        <circle cx="200" cy="190" r="3" fill="#6b7280" opacity="0.5" />
                                                    </svg>
                                                </div>

                                                {/* Legend */}
                                                <div className="space-y-3 text-xs">
                                                    <div className="flex items-center gap-3 justify-center">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-4 h-0.5 bg-orange-400 border-2 border-orange-400" style={{ borderStyle: 'dashed' }}></div>
                                                            <span className="text-orange-300 font-semibold">Present (2025)</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-4 h-1 bg-blue-400"></div>
                                                            <span className="text-blue-300 font-semibold">Scenario (2035)</span>
                                                        </div>
                                                    </div>

                                                    {/* Key Insight Box */}
                                                    <div className="bg-blue-900/40 p-3 rounded-lg border border-blue-400/40">
                                                        <p className="text-xs font-semibold text-blue-300 mb-2 flex items-center gap-2">
                                                            <span className="text-yellow-400">💡</span> Key Strategic Shift:
                                                        </p>
                                                        <p className="text-[11px] text-blue-100 leading-relaxed">
                                                            The industry remains constrained by <span className="font-semibold text-blue-300">surgical capacity bottlenecks</span> (supplier power stays high at 80%). Regulatory barriers intensify, reducing threat of new entrants (60%→30%). This creates a stable but slow-growth oligopoly where established players maintain positions through regulatory expertise and medical partnerships.
                                                        </p>
                                                    </div>

                                                    {/* Force-by-Force Breakdown */}
                                                    <div className="mt-3 pt-3 border-t border-blue-400/20">
                                                        <p className="text-[10px] text-blue-300 mb-2 italic text-center">Hover over each force for detailed explanation</p>
                                                        <div className="grid grid-cols-2 gap-2">
                                                            <div className="group relative cursor-help bg-gray-800/30 p-2 rounded">
                                                                <div className="flex justify-between text-[10px]">
                                                                    <span className="text-blue-200">New Entrants</span>
                                                                    <span className="text-blue-300">60%→30%</span>
                                                                </div>
                                                                <div className="absolute left-0 top-full mt-2 w-64 bg-gray-900 text-white text-xs p-2 rounded-lg shadow-xl border border-blue-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                                                                    <span className="font-semibold text-blue-300">Why LOW (30%):</span> Stricter regulations and slow market growth create high barriers. Established medical relationships become more valuable, making it harder for new players to enter.
                                                                </div>
                                                            </div>
                                                            <div className="group relative cursor-help bg-gray-800/30 p-2 rounded">
                                                                <div className="flex justify-between text-[10px]">
                                                                    <span className="text-blue-200">Supplier Power</span>
                                                                    <span className="text-blue-300">80%→80%</span>
                                                                </div>
                                                                <div className="absolute left-0 top-full mt-2 w-64 bg-gray-900 text-white text-xs p-2 rounded-lg shadow-xl border border-blue-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                                                                    <span className="font-semibold text-blue-300">Why HIGH (80%):</span> Neurosurgeon scarcity remains acute. Slow tech progress means non-invasive alternatives don't scale, keeping surgical specialists as critical bottleneck suppliers.
                                                                </div>
                                                            </div>
                                                            <div className="group relative cursor-help bg-gray-800/30 p-2 rounded">
                                                                <div className="flex justify-between text-[10px]">
                                                                    <span className="text-blue-200">Buyer Power</span>
                                                                    <span className="text-blue-300">50%→45%</span>
                                                                </div>
                                                                <div className="absolute left-0 top-full mt-2 w-64 bg-gray-900 text-white text-xs p-2 rounded-lg shadow-xl border border-blue-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                                                                    <span className="font-semibold text-blue-300">Why MODERATE (45%):</span> Patients with severe conditions have limited alternatives. Supply constraints reduce buyer negotiating power as demand exceeds capacity.
                                                                </div>
                                                            </div>
                                                            <div className="group relative cursor-help bg-gray-800/30 p-2 rounded">
                                                                <div className="flex justify-between text-[10px]">
                                                                    <span className="text-blue-200">Substitutes</span>
                                                                    <span className="text-blue-300">40%→30%</span>
                                                                </div>
                                                                <div className="absolute left-0 top-full mt-2 w-64 bg-gray-900 text-white text-xs p-2 rounded-lg shadow-xl border border-blue-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                                                                    <span className="font-semibold text-blue-300">Why LOW (30%):</span> Slow tech progress means alternative treatments (drugs, non-invasive therapies) advance slowly. For severe cases, BCIs remain the only viable solution.
                                                                </div>
                                                            </div>
                                                            <div className="group relative cursor-help bg-gray-800/30 p-2 rounded">
                                                                <div className="flex justify-between text-[10px]">
                                                                    <span className="text-blue-200">Rivalry</span>
                                                                    <span className="text-blue-300">70%→60%</span>
                                                                </div>
                                                                <div className="absolute left-0 top-full mt-2 w-64 bg-gray-900 text-white text-xs p-2 rounded-lg shadow-xl border border-blue-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                                                                    <span className="font-semibold text-blue-300">Why MODERATE (60%):</span> Small market size with established players creates moderate rivalry. Competition focuses on regulatory excellence and medical partnerships rather than aggressive price wars.
                                                                </div>
                                                            </div>
                                                            <div className="group relative cursor-help bg-gray-800/30 p-2 rounded">
                                                                <div className="flex justify-between text-[10px]">
                                                                    <span className="text-blue-200">Complementors</span>
                                                                    <span className="text-blue-300">40%→50%</span>
                                                                </div>
                                                                <div className="absolute left-0 top-full mt-2 w-64 bg-gray-900 text-white text-xs p-2 rounded-lg shadow-xl border border-blue-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                                                                    <span className="font-semibold text-blue-300">Why MODERATE (50%):</span> Training programs and surgical robotics become more important as enablers. Medical institutions and training partners grow in strategic value.
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Key Opportunities */}
                                            <div className="bg-green-900/30 p-4 rounded-lg border border-green-500/30">
                                                <p className="text-base font-bold text-green-300 mb-2 flex items-center gap-2">
                                                    <CheckCircle className="w-5 h-5" />
                                                    Key Opportunities
                                                </p>
                                                <ul className="space-y-1 text-xs text-green-100">
                                                    <li>• Premium pricing power due to scarcity</li>
                                                    <li>• Robotics/automation for surgical processes</li>
                                                    <li>• Training partnerships with medical schools</li>
                                                </ul>
                                            </div>

                                            {/* Key Threats */}
                                            <div className="bg-red-900/30 p-4 rounded-lg border border-red-500/30">
                                                <p className="text-base font-bold text-red-300 mb-2 flex items-center gap-2">
                                                    <XCircle className="w-5 h-5" />
                                                    Key Threats
                                                </p>
                                                <ul className="space-y-1 text-xs text-red-100">
                                                    <li>• Revenue capped by surgical capacity</li>
                                                    <li>• Customer frustration with wait times</li>
                                                    <li>• Regulatory pressure on safety standards</li>
                                                </ul>
                                            </div>
                                        </div>

                                        {/* Internal Impact */}
                                        <div className="space-y-4">
                                            <div className="group relative">
                                                <h5 className="text-lg font-bold text-blue-300 flex items-center gap-2 cursor-help">
                                                    <Shield className="w-6 h-6" />
                                                    Internal Impact: Our Capabilities
                                                    <span className="ml-1 text-xs text-blue-400">ⓘ</span>
                                                </h5>
                                                {/* Tooltip */}
                                                <div className="absolute left-0 top-full mt-2 w-80 bg-gray-900 text-white text-xs p-3 rounded-lg shadow-xl border border-blue-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                                                    <span className="font-semibold text-blue-300">What this analyzes:</span> How this scenario changes the strategic value of your current capabilities. Some capabilities become "crown jewels" (critically valuable), others become "commodities" (less differentiating), and gaps emerge. This reveals what to invest in, divest from, or build.
                                                </div>
                                            </div>

                                            {/* Capability Assessment */}
                                            <div className="bg-black/30 p-4 rounded-lg">
                                                <p className="text-base font-bold text-blue-200 mb-3">Capability Re-evaluation:
                                                    <span className="ml-2 text-blue-300 italic text-xs">(Hover over bars for interpretation)</span>
                                                </p>
                                                <div className="space-y-4">
                                                    <div className="group relative bg-gray-800/40 p-3 rounded-lg border border-gray-700/30">
                                                        <div className="flex justify-between text-xs mb-3">
                                                            <span className="text-blue-200 font-semibold text-sm">Non-invasive R&D</span>
                                                            <span className="text-yellow-300">↓ Less Valuable</span>
                                                        </div>
                                                        {/* Present (2025) Bar */}
                                                        <div className="mb-1">
                                                            <div className="flex justify-between text-[10px] mb-0.5">
                                                                <span className="text-orange-300">Present (2025)</span>
                                                                <span className="text-orange-300">70%</span>
                                                            </div>
                                                            <div className="w-full bg-gray-700 rounded-full h-1.5">
                                                                <div className="bg-orange-400 h-1.5 rounded-full" style={{ width: '70%' }}></div>
                                                            </div>
                                                        </div>
                                                        {/* Scenario (2035) Bar */}
                                                        <div className="cursor-help">
                                                            <div className="flex justify-between text-[10px] mb-0.5">
                                                                <span className="text-blue-300">Scenario (2035)</span>
                                                                <span className="text-red-300">40%</span>
                                                            </div>
                                                            <div className="w-full bg-gray-700 rounded-full h-1.5">
                                                                <div className="bg-red-500 h-1.5 rounded-full" style={{ width: '40%' }}></div>
                                                            </div>
                                                        </div>
                                                        {/* Tooltip */}
                                                        <div className="absolute left-0 top-full mt-2 w-72 bg-gray-900 text-white text-xs p-3 rounded-lg shadow-xl border border-blue-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                                                            <span className="font-semibold text-blue-300">Strategic Shift:</span> In a slow-growth, low-tech-progress world, investment in advanced non-invasive R&D declines in strategic value from 70% to 40%. The market remains small and medical-focused, making cutting-edge research less strategic.
                                                        </div>
                                                    </div>
                                                    <div className="group relative bg-gray-800/40 p-3 rounded-lg border border-gray-700/30">
                                                        <div className="flex justify-between text-xs mb-3">
                                                            <span className="text-blue-200 font-semibold text-sm">Regulatory Affairs Expertise</span>
                                                            <span className="text-green-300">↑ More Valuable</span>
                                                        </div>
                                                        {/* Present (2025) Bar */}
                                                        <div className="mb-1">
                                                            <div className="flex justify-between text-[10px] mb-0.5">
                                                                <span className="text-orange-300">Present (2025)</span>
                                                                <span className="text-orange-300">60%</span>
                                                            </div>
                                                            <div className="w-full bg-gray-700 rounded-full h-1.5">
                                                                <div className="bg-orange-400 h-1.5 rounded-full" style={{ width: '60%' }}></div>
                                                            </div>
                                                        </div>
                                                        {/* Scenario (2035) Bar */}
                                                        <div className="cursor-help">
                                                            <div className="flex justify-between text-[10px] mb-0.5">
                                                                <span className="text-blue-300">Scenario (2035)</span>
                                                                <span className="text-green-300">85%</span>
                                                            </div>
                                                            <div className="w-full bg-gray-700 rounded-full h-1.5">
                                                                <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '85%' }}></div>
                                                            </div>
                                                        </div>
                                                        {/* Tooltip */}
                                                        <div className="absolute left-0 top-full mt-2 w-72 bg-gray-900 text-white text-xs p-3 rounded-lg shadow-xl border border-blue-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                                                            <span className="font-semibold text-blue-300">Strategic Shift:</span> With stringent FDA regulations and lengthy approval cycles (8-12 years), navigating regulatory complexity becomes a critical competitive advantage in this cautious environment. Value increases from 60% to 85% as regulatory expertise becomes the key differentiator.
                                                        </div>
                                                    </div>
                                                    <div className="group relative bg-gray-800/40 p-3 rounded-lg border border-gray-700/30">
                                                        <div className="flex justify-between text-xs mb-3">
                                                            <span className="text-blue-200 font-semibold text-sm">Medical Partnership Network</span>
                                                            <span className="text-blue-300">→ Stable</span>
                                                        </div>
                                                        {/* Present (2025) Bar */}
                                                        <div className="mb-1">
                                                            <div className="flex justify-between text-[10px] mb-0.5">
                                                                <span className="text-orange-300">Present (2025)</span>
                                                                <span className="text-orange-300">65%</span>
                                                            </div>
                                                            <div className="w-full bg-gray-700 rounded-full h-1.5">
                                                                <div className="bg-orange-400 h-1.5 rounded-full" style={{ width: '65%' }}></div>
                                                            </div>
                                                        </div>
                                                        {/* Scenario (2035) Bar */}
                                                        <div className="cursor-help">
                                                            <div className="flex justify-between text-[10px] mb-0.5">
                                                                <span className="text-blue-300">Scenario (2035)</span>
                                                                <span className="text-blue-300">65%</span>
                                                            </div>
                                                            <div className="w-full bg-gray-700 rounded-full h-1.5">
                                                                <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '65%' }}></div>
                                                            </div>
                                                        </div>
                                                        {/* Tooltip */}
                                                        <div className="absolute left-0 top-full mt-2 w-72 bg-gray-900 text-white text-xs p-3 rounded-lg shadow-xl border border-blue-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                                                            <span className="font-semibold text-blue-300">Strategic Shift:</span> Medical partnerships remain important for the limited therapeutic market, but their value is constrained by slow market growth and narrow application focus (paralysis, neurological conditions only). Value remains stable at 65%.
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Strengths/Weaknesses Changes */}
                                            <div className="bg-black/30 p-4 rounded-lg">
                                                <div className="group relative mb-4">
                                                    <p className="text-base font-bold text-blue-200 cursor-help inline-flex items-center gap-2">
                                                        Strategic Position Shifts:
                                                        <span className="text-xs text-blue-300">ⓘ</span>
                                                    </p>
                                                    {/* Tooltip */}
                                                    <div className="absolute left-0 top-full mt-2 w-80 bg-gray-900 text-white text-xs p-3 rounded-lg shadow-xl border border-blue-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                                                        <span className="font-semibold text-blue-300">What this analyzes:</span> By combining external industry changes with internal capability shifts, this shows how your competitive position evolves in this scenario. It identifies new strengths (moats), emerging weaknesses (vulnerabilities), and strategic inflection points requiring decisive action.
                                                    </div>
                                                </div>
                                                <div className="space-y-2 text-xs">
                                                    <div className="flex items-start gap-2">
                                                        <AlertTriangle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                                                        <p className="text-blue-100"><span className="font-semibold">Core Competence → Rigidity:</span> Fast product iteration less valuable when bottleneck is surgery, not tech</p>
                                                    </div>
                                                    <div className="flex items-start gap-2">
                                                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                                                        <p className="text-blue-100"><span className="font-semibold">New Strength:</span> Hospital relationships become most valuable asset</p>
                                                    </div>
                                                    <div className="flex items-start gap-2">
                                                        <AlertTriangle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                                                        <p className="text-blue-100"><span className="font-semibold">Portfolio Imbalance:</span> Cognitive enhancement (20% revenue) and AI-Brain integration (10% revenue) divisions become marginalized as medical invasive market dominates</p>
                                                    </div>
                                                    <div className="flex items-start gap-2">
                                                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                                                        <p className="text-blue-100"><span className="font-semibold">Medical Division Leverage:</span> Our 70% revenue medical BCI division perfectly positioned to capitalize on this scenario</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Early Warning Indicators */}
                                            <div className="mt-6 bg-blue-950/50 p-5 rounded-lg border-2 border-blue-400/40">
                                                <h5 className="font-bold text-blue-200 mb-3 flex items-center gap-2">
                                                    <AlertCircle className="w-5 h-5" />
                                                    Early Warning Indicators: Triggers for "The Slow Lane"
                                                </h5>
                                                <p className="text-xs text-blue-200 mb-4 italic">This scenario emerges when a convergence of 2-3 indicators reaches their thresholds:</p>
                                                <div className="space-y-3 text-sm">
                                                    <div className="bg-black/30 p-3 rounded-lg">
                                                        <p className="font-semibold text-blue-200 mb-1">Signal 1 (Regulatory Pace):</p>
                                                        <p className="text-blue-100">FDA approval rate for new invasive BCI devices remains <span className="font-bold">below 15 per year</span> for three consecutive years (2025-2027).</p>
                                                    </div>
                                                    <div className="bg-black/30 p-3 rounded-lg">
                                                        <p className="font-semibold text-blue-200 mb-1">Signal 2 (Market Dominance):</p>
                                                        <p className="text-blue-100">Medical/therapeutic invasive BCIs maintain <span className="font-bold">over 80% market share</span> of total BCI revenue by 2026.</p>
                                                    </div>
                                                    <div className="bg-black/30 p-3 rounded-lg">
                                                        <p className="font-semibold text-blue-200 mb-1">Signal 3 (Consumer Stagnation):</p>
                                                        <p className="text-blue-100">Non-invasive consumer BCI adoption remains <span className="font-bold">below 5 million active users</span> globally by 2027.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Scenario 2: The Wild West */}
                                <div className="bg-gradient-to-br from-orange-900/40 to-red-900/40 p-6 rounded-xl border-2 border-orange-400/30">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="bg-orange-500 p-3 rounded-xl">
                                            <Brain className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <h4 className="text-2xl font-bold text-orange-300">{scenarios.scenario2.name}</h4>
                                            <p className="text-sm text-orange-200 italic">{scenarios.scenario2.tagline}</p>
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        {/* External Impact */}
                                        <div className="space-y-4">
                                            <div className="group relative">
                                                <h5 className="text-lg font-bold text-orange-300 flex items-center gap-2 cursor-help">
                                                    <Globe className="w-6 h-6" />
                                                    External Impact: Industry Dynamics
                                                    <span className="ml-1 text-xs text-orange-400">ⓘ</span>
                                                </h5>
                                                {/* Tooltip */}
                                                <div className="absolute left-0 top-full mt-2 w-80 bg-gray-900 text-white text-xs p-3 rounded-lg shadow-xl border border-orange-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                                                    <span className="font-semibold text-orange-300">What this analyzes:</span> How this scenario reshapes the competitive landscape using Porter's 6 Forces. Compare present vs. future to identify which industry dynamics intensify, weaken, or shift—revealing strategic threats and opportunities external to your organization.
                                                </div>
                                            </div>

                                            <div className="bg-black/30 p-4 rounded-lg">
                                                <p className="text-base font-bold text-orange-200 mb-3">Porter's 6 Forces Analysis:</p>

                                                {/* Radar Chart */}
                                                <div className="flex justify-center mb-4">
                                                    <svg viewBox="0 0 400 380" className="w-full h-80">
                                                        {/* Background circles */}
                                                        <circle cx="200" cy="190" r="120" fill="none" stroke="#4a5568" strokeWidth="0.5" opacity="0.3" />
                                                        <circle cx="200" cy="190" r="90" fill="none" stroke="#4a5568" strokeWidth="0.5" opacity="0.3" />
                                                        <circle cx="200" cy="190" r="60" fill="none" stroke="#4a5568" strokeWidth="0.5" opacity="0.3" />
                                                        <circle cx="200" cy="190" r="30" fill="none" stroke="#4a5568" strokeWidth="0.5" opacity="0.3" />

                                                        {/* Axis lines */}
                                                        <line x1="200" y1="190" x2="200" y2="70" stroke="#6b7280" strokeWidth="1" />
                                                        <line x1="200" y1="190" x2="304" y2="133" stroke="#6b7280" strokeWidth="1" />
                                                        <line x1="200" y1="190" x2="304" y2="247" stroke="#6b7280" strokeWidth="1" />
                                                        <line x1="200" y1="190" x2="200" y2="310" stroke="#6b7280" strokeWidth="1" />
                                                        <line x1="200" y1="190" x2="96" y2="247" stroke="#6b7280" strokeWidth="1" />
                                                        <line x1="200" y1="190" x2="96" y2="133" stroke="#6b7280" strokeWidth="1" />

                                                        {/* Present (2025) polygon - Orange */}
                                                        <polygon
                                                            points="200,118 242,154 260,208 200,238 140,208 158,154"
                                                            fill="#fb923c"
                                                            fillOpacity="0.25"
                                                            stroke="#fb923c"
                                                            strokeWidth="2"
                                                            strokeDasharray="5,3"
                                                        />

                                                        {/* Scenario 2: The Forbidden Frontier (2035) - Deep Orange/Red */}
                                                        <polygon
                                                            points="200,76 290,163 284,214 200,262 116,214 110,163"
                                                            fill="#f97316"
                                                            fillOpacity="0.35"
                                                            stroke="#f97316"
                                                            strokeWidth="2.5"
                                                        />

                                                        {/* Labels */}
                                                        <text x="200" y="55" textAnchor="middle" fill="#fdba74" fontSize="10" fontWeight="bold">Threat of</text>
                                                        <text x="200" y="67" textAnchor="middle" fill="#fdba74" fontSize="10" fontWeight="bold">New Entrants</text>

                                                        <text x="315" y="128" textAnchor="start" fill="#fdba74" fontSize="10" fontWeight="bold">Supplier</text>
                                                        <text x="315" y="140" textAnchor="start" fill="#fdba74" fontSize="10" fontWeight="bold">Power</text>

                                                        <text x="315" y="247" textAnchor="start" fill="#fdba74" fontSize="10" fontWeight="bold">Buyer</text>
                                                        <text x="315" y="259" textAnchor="start" fill="#fdba74" fontSize="10" fontWeight="bold">Power</text>

                                                        <text x="200" y="330" textAnchor="middle" fill="#fdba74" fontSize="10" fontWeight="bold">Threat of</text>
                                                        <text x="200" y="342" textAnchor="middle" fill="#fdba74" fontSize="10" fontWeight="bold">Substitutes</text>

                                                        <text x="85" y="247" textAnchor="end" fill="#fdba74" fontSize="10" fontWeight="bold">Competitive</text>
                                                        <text x="85" y="259" textAnchor="end" fill="#fdba74" fontSize="10" fontWeight="bold">Rivalry</text>

                                                        <text x="85" y="133" textAnchor="end" fill="#fdba74" fontSize="10" fontWeight="bold">Complementors</text>

                                                        {/* Center label */}
                                                        <text x="200" y="193" textAnchor="middle" fill="#9ca3af" fontSize="9">Low</text>
                                                        <circle cx="200" cy="190" r="3" fill="#6b7280" opacity="0.5" />
                                                    </svg>
                                                </div>

                                                {/* Legend */}
                                                <div className="space-y-3 text-xs">
                                                    <div className="flex items-center gap-3 justify-center">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-4 h-0.5 bg-orange-400 border-2 border-orange-400" style={{ borderStyle: 'dashed' }}></div>
                                                            <span className="text-orange-300 font-semibold">Present (2025)</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-4 h-1 bg-orange-500"></div>
                                                            <span className="text-orange-300 font-semibold">Scenario (2035)</span>
                                                        </div>
                                                    </div>

                                                    {/* Key Insight Box */}
                                                    <div className="bg-orange-900/40 p-3 rounded-lg border border-orange-400/40">
                                                        <p className="text-xs font-semibold text-orange-300 mb-2 flex items-center gap-2">
                                                            <span className="text-yellow-400">💡</span> Key Strategic Shift:
                                                        </p>
                                                        <p className="text-[11px] text-orange-100 leading-relaxed">
                                                            Deregulation creates a <span className="font-semibold text-orange-300">hyper-competitive free-for-all</span>. Threat of new entrants explodes (60%→95%) with zero barriers. Buyer power surges (50%→70%) as fragmented competition gives customers choice. Rivalry becomes extreme (70%→95%) in a race-to-the-bottom environment where quality standards collapse.
                                                        </p>
                                                    </div>

                                                    {/* Force-by-Force Breakdown */}
                                                    <div className="mt-3 pt-3 border-t border-orange-400/20">
                                                        <p className="text-[10px] text-orange-300 mb-2 italic text-center">Hover over each force for detailed explanation</p>
                                                        <div className="grid grid-cols-2 gap-2">
                                                            <div className="group relative cursor-help bg-gray-800/30 p-2 rounded">
                                                                <div className="flex justify-between text-[10px]">
                                                                    <span className="text-orange-200">New Entrants</span>
                                                                    <span className="text-orange-300">60%→95%</span>
                                                                </div>
                                                                <div className="absolute left-0 top-full mt-2 w-64 bg-gray-900 text-white text-xs p-2 rounded-lg shadow-xl border border-orange-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                                                                    <span className="font-semibold text-orange-300">Why VERY HIGH (95%):</span> Offshore deregulation removes all barriers to entry. Anyone can launch BCI products without FDA approval, creating a flood of new competitors entering the market.
                                                                </div>
                                                            </div>
                                                            <div className="group relative cursor-help bg-gray-800/30 p-2 rounded">
                                                                <div className="flex justify-between text-[10px]">
                                                                    <span className="text-orange-200">Supplier Power</span>
                                                                    <span className="text-orange-300">80%→50%</span>
                                                                </div>
                                                                <div className="absolute left-0 top-full mt-2 w-64 bg-gray-900 text-white text-xs p-2 rounded-lg shadow-xl border border-orange-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                                                                    <span className="font-semibold text-orange-300">Why MODERATE (50%):</span> Offshore markets attract more medical talent and alternative suppliers emerge in deregulated environments, reducing dependency on scarce neurosurgeons.
                                                                </div>
                                                            </div>
                                                            <div className="group relative cursor-help bg-gray-800/30 p-2 rounded">
                                                                <div className="flex justify-between text-[10px]">
                                                                    <span className="text-orange-200">Buyer Power</span>
                                                                    <span className="text-orange-300">50%→70%</span>
                                                                </div>
                                                                <div className="absolute left-0 top-full mt-2 w-64 bg-gray-900 text-white text-xs p-2 rounded-lg shadow-xl border border-orange-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                                                                    <span className="font-semibold text-orange-300">Why HIGH (70%):</span> Explosion of competitors gives customers abundant choice. Price-sensitive patients can shop around in deregulated markets, driving down prices and increasing their negotiating power.
                                                                </div>
                                                            </div>
                                                            <div className="group relative cursor-help bg-gray-800/30 p-2 rounded">
                                                                <div className="flex justify-between text-[10px]">
                                                                    <span className="text-orange-200">Substitutes</span>
                                                                    <span className="text-orange-300">40%→60%</span>
                                                                </div>
                                                                <div className="absolute left-0 top-full mt-2 w-64 bg-gray-900 text-white text-xs p-2 rounded-lg shadow-xl border border-orange-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                                                                    <span className="font-semibold text-orange-300">Why MODERATE (60%):</span> Fast tech progress creates more alternative solutions (advanced pharmaceuticals, non-invasive neurotechs). However, BCIs still offer unique capabilities that substitutes can't match.
                                                                </div>
                                                            </div>
                                                            <div className="group relative cursor-help bg-gray-800/30 p-2 rounded">
                                                                <div className="flex justify-between text-[10px]">
                                                                    <span className="text-orange-200">Rivalry</span>
                                                                    <span className="text-orange-300">70%→95%</span>
                                                                </div>
                                                                <div className="absolute left-0 top-full mt-2 w-64 bg-gray-900 text-white text-xs p-2 rounded-lg shadow-xl border border-orange-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                                                                    <span className="font-semibold text-orange-300">Why EXTREME (95%):</span> Deregulation triggers brutal price competition and race-to-the-bottom dynamics. Companies compete on cost rather than quality, creating extreme rivalry and margin erosion.
                                                                </div>
                                                            </div>
                                                            <div className="group relative cursor-help bg-gray-800/30 p-2 rounded">
                                                                <div className="flex justify-between text-[10px]">
                                                                    <span className="text-orange-200">Complementors</span>
                                                                    <span className="text-orange-300">40%→30%</span>
                                                                </div>
                                                                <div className="absolute left-0 top-full mt-2 w-64 bg-gray-900 text-white text-xs p-2 rounded-lg shadow-xl border border-orange-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                                                                    <span className="font-semibold text-orange-300">Why LOW (30%):</span> Quality complementors (training, infrastructure) are less valuable in a deregulated "Wild West" market. Speed to market matters more than ecosystem partnerships.
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="bg-green-900/30 p-4 rounded-lg border border-green-500/30">
                                                <p className="text-base font-bold text-green-300 mb-2 flex items-center gap-2">
                                                    <CheckCircle className="w-5 h-5" />
                                                    Opportunities
                                                </p>
                                                <ul className="space-y-1 text-xs text-green-100">
                                                    <li>• Rapid market expansion & experimentation</li>
                                                    <li>• First-mover advantage in new applications</li>
                                                    <li>• Lower compliance costs accelerate innovation</li>
                                                </ul>
                                            </div>

                                            <div className="bg-red-900/30 p-4 rounded-lg border border-red-500/30">
                                                <p className="text-base font-bold text-red-300 mb-2 flex items-center gap-2">
                                                    <XCircle className="w-5 h-5" />
                                                    Threats
                                                </p>
                                                <ul className="space-y-1 text-xs text-red-100">
                                                    <li>• Brand damaged by unsafe competitors</li>
                                                    <li>• Race to bottom on pricing</li>
                                                    <li>• Liability exposure from industry incidents</li>
                                                </ul>
                                            </div>
                                        </div>

                                        {/* Internal Impact */}
                                        <div className="space-y-4">
                                            <div className="group relative">
                                                <h5 className="text-lg font-bold text-orange-300 flex items-center gap-2 cursor-help">
                                                    <Shield className="w-6 h-6" />
                                                    Internal Impact: Our Capabilities
                                                    <span className="ml-1 text-xs text-orange-400">ⓘ</span>
                                                </h5>
                                                {/* Tooltip */}
                                                <div className="absolute left-0 top-full mt-2 w-80 bg-gray-900 text-white text-xs p-3 rounded-lg shadow-xl border border-orange-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                                                    <span className="font-semibold text-orange-300">What this analyzes:</span> How this scenario changes the strategic value of your current capabilities. Some capabilities become "crown jewels" (critically valuable), others become "commodities" (less differentiating), and gaps emerge. This reveals what to invest in, divest from, or build.
                                                </div>
                                            </div>

                                            <div className="bg-black/30 p-4 rounded-lg">
                                                <p className="text-base font-bold text-orange-200 mb-3">Capability Re-evaluation:
                                                    <span className="ml-2 text-orange-300 italic text-xs">(Hover over bars for interpretation)</span>
                                                </p>
                                                <div className="space-y-4">
                                                    <div className="group relative bg-gray-800/40 p-3 rounded-lg border border-gray-700/30">
                                                        <div className="flex justify-between text-xs mb-3">
                                                            <span className="text-orange-200 font-semibold text-sm">Advanced R&D Capabilities</span>
                                                            <span className="text-green-300">↑ Crown Jewel</span>
                                                        </div>
                                                        {/* Present (2025) Bar */}
                                                        <div className="mb-1">
                                                            <div className="flex justify-between text-[10px] mb-0.5">
                                                                <span className="text-orange-300">Present (2025)</span>
                                                                <span className="text-orange-300">70%</span>
                                                            </div>
                                                            <div className="w-full bg-gray-700 rounded-full h-1.5">
                                                                <div className="bg-orange-400 h-1.5 rounded-full" style={{ width: '70%' }}></div>
                                                            </div>
                                                        </div>
                                                        {/* Scenario (2035) Bar */}
                                                        <div className="cursor-help">
                                                            <div className="flex justify-between text-[10px] mb-0.5">
                                                                <span className="text-orange-300">Scenario (2035)</span>
                                                                <span className="text-green-300">90%</span>
                                                            </div>
                                                            <div className="w-full bg-gray-700 rounded-full h-1.5">
                                                                <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '90%' }}></div>
                                                            </div>
                                                        </div>
                                                        {/* Tooltip */}
                                                        <div className="absolute left-0 top-full mt-2 w-72 bg-gray-900 text-white text-xs p-3 rounded-lg shadow-xl border border-orange-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                                                            <span className="font-semibold text-orange-300">Strategic Shift:</span> In a world where tech has advanced but regulations block it, our ability to develop breakthrough technology (quantum sensors, AI-driven signal processing) becomes critical - even if we can't deploy it everywhere yet. Value surges from 70% to 90%.
                                                        </div>
                                                    </div>
                                                    <div className="group relative bg-gray-800/40 p-3 rounded-lg border border-gray-700/30">
                                                        <div className="flex justify-between text-xs mb-3">
                                                            <span className="text-orange-200 font-semibold text-sm">Regulatory Navigation</span>
                                                            <span className="text-green-300">↑ Essential</span>
                                                        </div>
                                                        {/* Present (2025) Bar */}
                                                        <div className="mb-1">
                                                            <div className="flex justify-between text-[10px] mb-0.5">
                                                                <span className="text-orange-300">Present (2025)</span>
                                                                <span className="text-orange-300">60%</span>
                                                            </div>
                                                            <div className="w-full bg-gray-700 rounded-full h-1.5">
                                                                <div className="bg-orange-400 h-1.5 rounded-full" style={{ width: '60%' }}></div>
                                                            </div>
                                                        </div>
                                                        {/* Scenario (2035) Bar */}
                                                        <div className="cursor-help">
                                                            <div className="flex justify-between text-[10px] mb-0.5">
                                                                <span className="text-orange-300">Scenario (2035)</span>
                                                                <span className="text-green-300">85%</span>
                                                            </div>
                                                            <div className="w-full bg-gray-700 rounded-full h-1.5">
                                                                <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '85%' }}></div>
                                                            </div>
                                                        </div>
                                                        {/* Tooltip */}
                                                        <div className="absolute left-0 top-full mt-2 w-72 bg-gray-900 text-white text-xs p-3 rounded-lg shadow-xl border border-orange-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                                                            <span className="font-semibold text-orange-300">Strategic Shift:</span> With regulatory fragmentation (EU bans, US patchwork, offshore havens), expertly navigating complex multi-jurisdictional compliance becomes the difference between market access and exclusion. Value rises from 60% to 85%.
                                                        </div>
                                                    </div>
                                                    <div className="group relative bg-gray-800/40 p-3 rounded-lg border border-gray-700/30">
                                                        <div className="flex justify-between text-xs mb-3">
                                                            <span className="text-orange-200 font-semibold text-sm">Offshore Market Strategy</span>
                                                            <span className="text-yellow-300">↑ New Opportunity</span>
                                                        </div>
                                                        {/* Present (2025) Bar */}
                                                        <div className="mb-1">
                                                            <div className="flex justify-between text-[10px] mb-0.5">
                                                                <span className="text-orange-300">Present (2025)</span>
                                                                <span className="text-orange-300">20%</span>
                                                            </div>
                                                            <div className="w-full bg-gray-700 rounded-full h-1.5">
                                                                <div className="bg-orange-400 h-1.5 rounded-full" style={{ width: '20%' }}></div>
                                                            </div>
                                                        </div>
                                                        {/* Scenario (2035) Bar */}
                                                        <div className="cursor-help">
                                                            <div className="flex justify-between text-[10px] mb-0.5">
                                                                <span className="text-orange-300">Scenario (2035)</span>
                                                                <span className="text-yellow-300">70%</span>
                                                            </div>
                                                            <div className="w-full bg-gray-700 rounded-full h-1.5">
                                                                <div className="bg-yellow-500 h-1.5 rounded-full" style={{ width: '70%' }}></div>
                                                            </div>
                                                        </div>
                                                        {/* Tooltip */}
                                                        <div className="absolute left-0 top-full mt-2 w-72 bg-gray-900 text-white text-xs p-3 rounded-lg shadow-xl border border-orange-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                                                            <span className="font-semibold text-orange-300">Strategic Shift:</span> Neural tourism to Singapore, Dubai, and São Paulo ($4.2B market) creates new opportunities - but requires capabilities in international partnerships, medical tourism infrastructure, and operating in "BCI haven" cities. Rises from 20% to 70% as offshore markets become critical.
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="bg-black/30 p-4 rounded-lg">
                                                <div className="group relative mb-4">
                                                    <p className="text-base font-bold text-orange-200 cursor-help inline-flex items-center gap-2">
                                                        Strategic Position Shifts:
                                                        <span className="text-xs text-orange-300">ⓘ</span>
                                                    </p>
                                                    {/* Tooltip */}
                                                    <div className="absolute left-0 top-full mt-2 w-80 bg-gray-900 text-white text-xs p-3 rounded-lg shadow-xl border border-orange-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                                                        <span className="font-semibold text-orange-300">What this analyzes:</span> By combining external industry changes with internal capability shifts, this shows how your competitive position evolves in this scenario. It identifies new strengths (moats), emerging weaknesses (vulnerabilities), and strategic inflection points requiring decisive action.
                                                    </div>
                                                </div>
                                                <div className="space-y-2 text-xs">
                                                    <div className="flex items-start gap-2">
                                                        <AlertTriangle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                                                        <p className="text-orange-100"><span className="font-semibold">Risk:</span> Premium positioning undermined by commodity competition</p>
                                                    </div>
                                                    <div className="flex items-start gap-2">
                                                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                                                        <p className="text-orange-100"><span className="font-semibold">Opportunity:</span> Quality becomes key differentiator in chaotic market</p>
                                                    </div>
                                                    <div className="flex items-start gap-2">
                                                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                                                        <p className="text-orange-100"><span className="font-semibold">Cognitive Enhancement Boom:</span> Offshore markets enable rapid commercialization of our 20% revenue cognitive enhancement division—no FDA constraints</p>
                                                    </div>
                                                    <div className="flex items-start gap-2">
                                                        <AlertTriangle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                                                        <p className="text-orange-100"><span className="font-semibold">Regulatory Expertise Devalued:</span> FDA mastery (our medical division's core strength) becomes liability in lightly-regulated offshore markets</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Early Warning Indicators */}
                                            <div className="mt-6 bg-orange-950/50 p-5 rounded-lg border-2 border-orange-400/40">
                                                <h5 className="font-bold text-orange-200 mb-3 flex items-center gap-2">
                                                    <AlertCircle className="w-5 h-5" />
                                                    Early Warning Indicators: Triggers for "The Wild West"
                                                </h5>
                                                <p className="text-xs text-orange-200 mb-4 italic">This scenario emerges when a convergence of 3 indicators reaches their thresholds:</p>
                                                <div className="space-y-3 text-sm">
                                                    <div className="bg-black/30 p-3 rounded-lg">
                                                        <p className="font-semibold text-orange-200 mb-1">Signal 1 (Regulatory Fragmentation):</p>
                                                        <p className="text-orange-100">More than <span className="font-bold">10 countries</span> establish BCI markets with minimal safety requirements (below FDA equivalency) by 2026.</p>
                                                    </div>
                                                    <div className="bg-black/30 p-3 rounded-lg">
                                                        <p className="font-semibold text-orange-200 mb-1">Signal 2 (Offshore Investment Surge):</p>
                                                        <p className="text-orange-100">Venture capital investment in non-medical consumer BCIs outside the US/EU exceeds <span className="font-bold">$15B annually</span> by 2027.</p>
                                                    </div>
                                                    <div className="bg-black/30 p-3 rounded-lg">
                                                        <p className="font-semibold text-orange-200 mb-1">Signal 3 (Market Velocity):</p>
                                                        <p className="text-orange-100">Time-to-market for new BCI products in offshore jurisdictions averages <span className="font-bold">under 18 months</span> vs. 5+ years in FDA-regulated markets.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Scenario 3: The Fortress */}
                                <div className="bg-gradient-to-br from-purple-900/40 to-violet-900/40 p-6 rounded-xl border-2 border-purple-400/30">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="bg-purple-500 p-3 rounded-xl">
                                            <Brain className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <h4 className="text-2xl font-bold text-purple-300">{scenarios.scenario3.name}</h4>
                                            <p className="text-sm text-purple-200 italic">{scenarios.scenario3.tagline}</p>
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            <div className="group relative">
                                                <h5 className="text-lg font-bold text-purple-300 flex items-center gap-2 cursor-help">
                                                    <Globe className="w-6 h-6" />
                                                    External Impact: Industry Dynamics
                                                    <span className="ml-1 text-xs text-purple-400">ⓘ</span>
                                                </h5>
                                                {/* Tooltip */}
                                                <div className="absolute left-0 top-full mt-2 w-80 bg-gray-900 text-white text-xs p-3 rounded-lg shadow-xl border border-purple-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                                                    <span className="font-semibold text-purple-300">What this analyzes:</span> How this scenario reshapes the competitive landscape using Porter's 6 Forces. Compare present vs. future to identify which industry dynamics intensify, weaken, or shift—revealing strategic threats and opportunities external to your organization.
                                                </div>
                                            </div>

                                            <div className="bg-black/30 p-4 rounded-lg">
                                                <p className="text-base font-bold text-purple-200 mb-3">Porter's 6 Forces Analysis:</p>

                                                {/* Radar Chart */}
                                                <div className="flex justify-center mb-4">
                                                    <svg viewBox="0 0 400 380" className="w-full h-80">
                                                        {/* Background circles */}
                                                        <circle cx="200" cy="190" r="120" fill="none" stroke="#4a5568" strokeWidth="0.5" opacity="0.3" />
                                                        <circle cx="200" cy="190" r="90" fill="none" stroke="#4a5568" strokeWidth="0.5" opacity="0.3" />
                                                        <circle cx="200" cy="190" r="60" fill="none" stroke="#4a5568" strokeWidth="0.5" opacity="0.3" />
                                                        <circle cx="200" cy="190" r="30" fill="none" stroke="#4a5568" strokeWidth="0.5" opacity="0.3" />

                                                        {/* Axis lines */}
                                                        <line x1="200" y1="190" x2="200" y2="70" stroke="#6b7280" strokeWidth="1" />
                                                        <line x1="200" y1="190" x2="304" y2="133" stroke="#6b7280" strokeWidth="1" />
                                                        <line x1="200" y1="190" x2="304" y2="247" stroke="#6b7280" strokeWidth="1" />
                                                        <line x1="200" y1="190" x2="200" y2="310" stroke="#6b7280" strokeWidth="1" />
                                                        <line x1="200" y1="190" x2="96" y2="247" stroke="#6b7280" strokeWidth="1" />
                                                        <line x1="200" y1="190" x2="96" y2="133" stroke="#6b7280" strokeWidth="1" />

                                                        {/* Present (2025) polygon - Orange
                                                            Threat of New Entrants: 60%
                                                            Supplier Power: 40%
                                                            Buyer Power: 50%
                                                            Threat of Substitutes: 40%
                                                            Rivalry: 70%
                                                            Complementors: 50% */}
                                                        <polygon
                                                            points="200,118 242,154 260,208 200,238 140,208 158,154"
                                                            fill="#fb923c"
                                                            fillOpacity="0.25"
                                                            stroke="#fb923c"
                                                            strokeWidth="2"
                                                            strokeDasharray="5,3"
                                                        />

                                                        {/* Scenario 3: The Waiting World (2035) - Purple
                                                            Threat of New Entrants: 10%
                                                            Supplier Power: 95%
                                                            Buyer Power: 25%
                                                            Threat of Substitutes: 20%
                                                            Rivalry: 50%
                                                            Complementors: 85% */}
                                                        <polygon
                                                            points="200,178 286,137 290,217 200,262 110,217 114,137"
                                                            fill="#a855f7"
                                                            fillOpacity="0.35"
                                                            stroke="#a855f7"
                                                            strokeWidth="2.5"
                                                        />

                                                        {/* Labels with better positioning */}
                                                        <text x="200" y="55" textAnchor="middle" fill="#c084fc" fontSize="10" fontWeight="bold">Threat of</text>
                                                        <text x="200" y="67" textAnchor="middle" fill="#c084fc" fontSize="10" fontWeight="bold">New Entrants</text>

                                                        <text x="315" y="128" textAnchor="start" fill="#c084fc" fontSize="10" fontWeight="bold">Supplier</text>
                                                        <text x="315" y="140" textAnchor="start" fill="#c084fc" fontSize="10" fontWeight="bold">Power</text>

                                                        <text x="315" y="247" textAnchor="start" fill="#c084fc" fontSize="10" fontWeight="bold">Buyer</text>
                                                        <text x="315" y="259" textAnchor="start" fill="#c084fc" fontSize="10" fontWeight="bold">Power</text>

                                                        <text x="200" y="330" textAnchor="middle" fill="#c084fc" fontSize="10" fontWeight="bold">Threat of</text>
                                                        <text x="200" y="342" textAnchor="middle" fill="#c084fc" fontSize="10" fontWeight="bold">Substitutes</text>

                                                        <text x="85" y="247" textAnchor="end" fill="#c084fc" fontSize="10" fontWeight="bold">Competitive</text>
                                                        <text x="85" y="259" textAnchor="end" fill="#c084fc" fontSize="10" fontWeight="bold">Rivalry</text>

                                                        <text x="85" y="133" textAnchor="end" fill="#c084fc" fontSize="10" fontWeight="bold">Complementors</text>

                                                        {/* Center label */}
                                                        <text x="200" y="193" textAnchor="middle" fill="#9ca3af" fontSize="9">Low</text>
                                                        <circle cx="200" cy="190" r="3" fill="#6b7280" opacity="0.5" />
                                                    </svg>
                                                </div>

                                                {/* Legend */}
                                                <div className="space-y-3 text-xs">
                                                    <div className="flex items-center gap-3 justify-center">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-4 h-0.5 bg-orange-400 border-2 border-orange-400" style={{ borderStyle: 'dashed' }}></div>
                                                            <span className="text-orange-300 font-semibold">Present (2025)</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-4 h-1 bg-purple-500"></div>
                                                            <span className="text-purple-300 font-semibold">Scenario (2035)</span>
                                                        </div>
                                                    </div>

                                                    {/* Key Insight Box */}
                                                    <div className="bg-purple-900/40 p-3 rounded-lg border border-purple-400/40">
                                                        <p className="text-xs font-semibold text-purple-300 mb-2 flex items-center gap-2">
                                                            <span className="text-yellow-400">💡</span> Key Strategic Shift:
                                                        </p>
                                                        <p className="text-[11px] text-purple-100 leading-relaxed">
                                                            The industry transforms from a <span className="font-semibold text-orange-300">competitive, fragmented market</span> (high rivalry, moderate barriers) to a <span className="font-semibold text-purple-300">supply-constrained oligopoly</span>. Supplier power explodes (40%→95%) due to neurosurgeon scarcity, while buyer power collapses (50%→25%) as demand outstrips supply. This creates premium pricing power but caps growth potential.
                                                        </p>
                                                    </div>

                                                    {/* Force-by-Force Breakdown */}
                                                    <div className="mt-3 pt-3 border-t border-purple-400/20">
                                                        <p className="text-[10px] text-purple-300 mb-2 italic text-center">Hover over each force for detailed explanation</p>
                                                        <div className="grid grid-cols-2 gap-2">
                                                            <div className="group relative cursor-help bg-gray-800/30 p-2 rounded">
                                                                <div className="flex justify-between text-[10px]">
                                                                    <span className="text-purple-200">New Entrants</span>
                                                                    <span className="text-purple-300">60%→10%</span>
                                                                </div>
                                                                <div className="absolute left-0 top-full mt-2 w-64 bg-gray-900 text-white text-xs p-2 rounded-lg shadow-xl border border-purple-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                                                                    <span className="font-semibold text-purple-300">Why VERY LOW (10%):</span> Neurosurgeon scarcity creates an insurmountable barrier. Without access to skilled surgeons, new entrants cannot enter the invasive BCI market. Existing players control the talent pool.
                                                                </div>
                                                            </div>
                                                            <div className="group relative cursor-help bg-gray-800/30 p-2 rounded">
                                                                <div className="flex justify-between text-[10px]">
                                                                    <span className="text-purple-200">Supplier Power</span>
                                                                    <span className="text-purple-300">80%→95%</span>
                                                                </div>
                                                                <div className="absolute left-0 top-full mt-2 w-64 bg-gray-900 text-white text-xs p-2 rounded-lg shadow-xl border border-purple-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                                                                    <span className="font-semibold text-purple-300">Why EXTREME (95%):</span> Massive demand for invasive BCIs meets severe neurosurgeon shortage. Surgeons become kingmakers who can dictate terms, extract premium fees, and control which companies succeed. Ultimate bottleneck.
                                                                </div>
                                                            </div>
                                                            <div className="group relative cursor-help bg-gray-800/30 p-2 rounded">
                                                                <div className="flex justify-between text-[10px]">
                                                                    <span className="text-purple-200">Buyer Power</span>
                                                                    <span className="text-purple-300">50%→25%</span>
                                                                </div>
                                                                <div className="absolute left-0 top-full mt-2 w-64 bg-gray-900 text-white text-xs p-2 rounded-lg shadow-xl border border-purple-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                                                                    <span className="font-semibold text-purple-300">Why LOW (25%):</span> Demand far exceeds surgical capacity. Patients face multi-year waitlists and have zero negotiating power. You can charge premium prices because supply is so constrained.
                                                                </div>
                                                            </div>
                                                            <div className="group relative cursor-help bg-gray-800/30 p-2 rounded">
                                                                <div className="flex justify-between text-[10px]">
                                                                    <span className="text-purple-200">Substitutes</span>
                                                                    <span className="text-purple-300">40%→20%</span>
                                                                </div>
                                                                <div className="absolute left-0 top-full mt-2 w-64 bg-gray-900 text-white text-xs p-2 rounded-lg shadow-xl border border-purple-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                                                                    <span className="font-semibold text-purple-300">Why LOW (20%):</span> High social acceptance means patients specifically want invasive BCIs, not substitutes. Non-invasive alternatives can't deliver the same transformative results. Limited threat from alternatives.
                                                                </div>
                                                            </div>
                                                            <div className="group relative cursor-help bg-gray-800/30 p-2 rounded">
                                                                <div className="flex justify-between text-[10px]">
                                                                    <span className="text-purple-200">Rivalry</span>
                                                                    <span className="text-purple-300">70%→50%</span>
                                                                </div>
                                                                <div className="absolute left-0 top-full mt-2 w-64 bg-gray-900 text-white text-xs p-2 rounded-lg shadow-xl border border-purple-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                                                                    <span className="font-semibold text-purple-300">Why MODERATE (50%):</span> Limited surgical capacity forces companies to compete for surgeon partnerships rather than on price. Rivalry shifts from customer acquisition to supplier relationships. Gentler competition.
                                                                </div>
                                                            </div>
                                                            <div className="group relative cursor-help bg-gray-800/30 p-2 rounded">
                                                                <div className="flex justify-between text-[10px]">
                                                                    <span className="text-purple-200">Complementors</span>
                                                                    <span className="text-purple-300">40%→85%</span>
                                                                </div>
                                                                <div className="absolute left-0 top-full mt-2 w-64 bg-gray-900 text-white text-xs p-2 rounded-lg shadow-xl border border-purple-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                                                                    <span className="font-semibold text-purple-300">Why HIGH (85%):</span> Training programs, surgical robotics, and neurosurgeon recruitment partners become critically valuable. Anyone who can expand surgical capacity is a strategic goldmine. Ecosystem partners are essential.
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="bg-green-900/30 p-4 rounded-lg border border-green-500/30">
                                                <p className="text-base font-bold text-green-300 mb-2 flex items-center gap-2">
                                                    <CheckCircle className="w-5 h-5" />
                                                    Opportunities
                                                </p>
                                                <ul className="space-y-1 text-xs text-green-100">
                                                    <li>• Stable oligopoly with high margins</li>
                                                    <li>• Regulatory expertise as moat</li>
                                                    <li>• Public trust in approved devices</li>
                                                </ul>
                                            </div>

                                            <div className="bg-red-900/30 p-4 rounded-lg border border-red-500/30">
                                                <p className="text-base font-bold text-red-300 mb-2 flex items-center gap-2">
                                                    <XCircle className="w-5 h-5" />
                                                    Threats
                                                </p>
                                                <ul className="space-y-1 text-xs text-red-100">
                                                    <li>• Innovation stifled by compliance burden</li>
                                                    <li>• Small TAM due to access restrictions</li>
                                                    <li>• Dependence on regulatory relationships</li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="group relative">
                                                <h5 className="text-lg font-bold text-purple-300 flex items-center gap-2 cursor-help">
                                                    <Shield className="w-6 h-6" />
                                                    Internal Impact: Our Capabilities
                                                    <span className="ml-1 text-xs text-purple-400">ⓘ</span>
                                                </h5>
                                                {/* Tooltip */}
                                                <div className="absolute left-0 top-full mt-2 w-80 bg-gray-900 text-white text-xs p-3 rounded-lg shadow-xl border border-purple-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                                                    <span className="font-semibold text-purple-300">What this analyzes:</span> How this scenario changes the strategic value of your current capabilities. Some capabilities become "crown jewels" (critically valuable), others become "commodities" (less differentiating), and gaps emerge. This reveals what to invest in, divest from, or build.
                                                </div>
                                            </div>

                                            <div className="bg-black/30 p-4 rounded-lg">
                                                <p className="text-base font-bold text-purple-200 mb-3">Capability Re-evaluation:
                                                    <span className="ml-2 text-purple-300 italic text-xs">(Hover over bars for interpretation)</span>
                                                </p>
                                                <div className="space-y-4">
                                                    <div className="group relative bg-gray-800/40 p-3 rounded-lg border border-gray-700/30">
                                                        <div className="flex justify-between text-xs mb-3">
                                                            <span className="text-purple-200 font-semibold text-sm">Neurosurgeon Partnerships</span>
                                                            <span className="text-green-300">↑ Crown Jewel</span>
                                                        </div>
                                                        {/* Present (2025) Bar */}
                                                        <div className="mb-1">
                                                            <div className="flex justify-between text-[10px] mb-0.5">
                                                                <span className="text-orange-300">Present (2025)</span>
                                                                <span className="text-orange-300">65%</span>
                                                            </div>
                                                            <div className="w-full bg-gray-700 rounded-full h-1.5">
                                                                <div className="bg-orange-400 h-1.5 rounded-full" style={{ width: '65%' }}></div>
                                                            </div>
                                                        </div>
                                                        {/* Scenario (2035) Bar */}
                                                        <div className="cursor-help">
                                                            <div className="flex justify-between text-[10px] mb-0.5">
                                                                <span className="text-purple-300">Scenario (2035)</span>
                                                                <span className="text-green-300">98%</span>
                                                            </div>
                                                            <div className="w-full bg-gray-700 rounded-full h-1.5">
                                                                <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '98%' }}></div>
                                                            </div>
                                                        </div>
                                                        {/* Tooltip */}
                                                        <div className="absolute left-0 top-full mt-2 w-72 bg-gray-900 text-white text-xs p-3 rounded-lg shadow-xl border border-purple-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                                                            <span className="font-semibold text-purple-300">Strategic Shift:</span> With only 3,200 certified BCI neurosurgeons globally and 18-month waitlists, relationships with top surgical partners transform from important (65%) to absolutely critical (98%) - controlling scarce surgical capacity is like controlling oil wells.
                                                        </div>
                                                    </div>
                                                    <div className="group relative bg-gray-800/40 p-3 rounded-lg border border-gray-700/30">
                                                        <div className="flex justify-between text-xs mb-3">
                                                            <span className="text-purple-200 font-semibold text-sm">Surgical Training Programs</span>
                                                            <span className="text-green-300">↑ Essential</span>
                                                        </div>
                                                        {/* Present (2025) Bar */}
                                                        <div className="mb-1">
                                                            <div className="flex justify-between text-[10px] mb-0.5">
                                                                <span className="text-orange-300">Present (2025)</span>
                                                                <span className="text-orange-300">40%</span>
                                                            </div>
                                                            <div className="w-full bg-gray-700 rounded-full h-1.5">
                                                                <div className="bg-orange-400 h-1.5 rounded-full" style={{ width: '40%' }}></div>
                                                            </div>
                                                        </div>
                                                        {/* Scenario (2035) Bar */}
                                                        <div className="cursor-help">
                                                            <div className="flex justify-between text-[10px] mb-0.5">
                                                                <span className="text-purple-300">Scenario (2035)</span>
                                                                <span className="text-green-300">85%</span>
                                                            </div>
                                                            <div className="w-full bg-gray-700 rounded-full h-1.5">
                                                                <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '85%' }}></div>
                                                            </div>
                                                        </div>
                                                        {/* Tooltip */}
                                                        <div className="absolute left-0 top-full mt-2 w-72 bg-gray-900 text-white text-xs p-3 rounded-lg shadow-xl border border-purple-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                                                            <span className="font-semibold text-purple-300">Strategic Shift:</span> The ability to expand surgical capacity through medical school partnerships and surgeon training programs transforms from moderately important (40%) to strategically critical (85%) - this is the only path to meeting massive pent-up demand worth billions.
                                                        </div>
                                                    </div>
                                                    <div className="group relative bg-gray-800/40 p-3 rounded-lg border border-gray-700/30">
                                                        <div className="flex justify-between text-xs mb-3">
                                                            <span className="text-purple-200 font-semibold text-sm">Non-Invasive R&D</span>
                                                            <span className="text-red-300">↓ Less Valuable</span>
                                                        </div>
                                                        {/* Present (2025) Bar */}
                                                        <div className="mb-1">
                                                            <div className="flex justify-between text-[10px] mb-0.5">
                                                                <span className="text-orange-300">Present (2025)</span>
                                                                <span className="text-orange-300">70%</span>
                                                            </div>
                                                            <div className="w-full bg-gray-700 rounded-full h-1.5">
                                                                <div className="bg-orange-400 h-1.5 rounded-full" style={{ width: '70%' }}></div>
                                                            </div>
                                                        </div>
                                                        {/* Scenario (2035) Bar */}
                                                        <div className="cursor-help">
                                                            <div className="flex justify-between text-[10px] mb-0.5">
                                                                <span className="text-purple-300">Scenario (2035)</span>
                                                                <span className="text-red-300">35%</span>
                                                            </div>
                                                            <div className="w-full bg-gray-700 rounded-full h-1.5">
                                                                <div className="bg-red-500 h-1.5 rounded-full" style={{ width: '35%' }}></div>
                                                            </div>
                                                        </div>
                                                        {/* Tooltip */}
                                                        <div className="absolute left-0 top-full mt-2 w-72 bg-gray-900 text-white text-xs p-3 rounded-lg shadow-xl border border-purple-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                                                            <span className="font-semibold text-purple-300">Strategic Shift:</span> With non-invasive tech progress stalled (still only ~45 channels), continued R&D investment declines in strategic value from 70% to 35%. The market has accepted invasive procedures - the bottleneck is surgical capacity, not technology advancement.
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="bg-black/30 p-4 rounded-lg">
                                                <div className="group relative mb-4">
                                                    <p className="text-base font-bold text-purple-200 cursor-help inline-flex items-center gap-2">
                                                        Strategic Position Shifts:
                                                        <span className="text-xs text-purple-300">ⓘ</span>
                                                    </p>
                                                    {/* Tooltip */}
                                                    <div className="absolute left-0 top-full mt-2 w-80 bg-gray-900 text-white text-xs p-3 rounded-lg shadow-xl border border-purple-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                                                        <span className="font-semibold text-purple-300">What this analyzes:</span> By combining external industry changes with internal capability shifts, this shows how your competitive position evolves in this scenario. It identifies new strengths (moats), emerging weaknesses (vulnerabilities), and strategic inflection points requiring decisive action.
                                                    </div>
                                                </div>
                                                <div className="space-y-2 text-xs">
                                                    <div className="flex items-start gap-2">
                                                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                                                        <p className="text-purple-100"><span className="font-semibold">Competitive Moat:</span> Regulatory expertise becomes unassailable advantage</p>
                                                    </div>
                                                    <div className="flex items-start gap-2">
                                                        <AlertTriangle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                                                        <p className="text-purple-100"><span className="font-semibold">Innovation Risk:</span> Culture may become risk-averse and slow</p>
                                                    </div>
                                                    <div className="flex items-start gap-2">
                                                        <AlertTriangle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                                                        <p className="text-purple-100"><span className="font-semibold">Innovation Frozen:</span> AI-Brain integration (10% revenue) and cognitive enhancement (20% revenue) research stifled by heavy regulation</p>
                                                    </div>
                                                    <div className="flex items-start gap-2">
                                                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                                                        <p className="text-purple-100"><span className="font-semibold">Medical Division Dominance:</span> 70% revenue medical BCI division thrives with established regulatory pathways and high barriers to entry</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Early Warning Indicators */}
                                            <div className="mt-6 bg-purple-950/50 p-5 rounded-lg border-2 border-purple-400/40">
                                                <h5 className="font-bold text-purple-200 mb-3 flex items-center gap-2">
                                                    <AlertCircle className="w-5 h-5" />
                                                    Early Warning Indicators: Triggers for "The Fortress"
                                                </h5>
                                                <p className="text-xs text-purple-200 mb-4 italic">This scenario emerges when a convergence of 3 indicators reaches their thresholds:</p>
                                                <div className="space-y-3 text-sm">
                                                    <div className="bg-black/30 p-3 rounded-lg">
                                                        <p className="font-semibold text-purple-200 mb-1">Signal 1 (Regulatory Tightening):</p>
                                                        <p className="text-purple-100">More than <span className="font-bold">5 major jurisdictions</span> (US, EU, China, Japan, etc.) implement BCI-specific regulations requiring clinical trials for all neural interfaces by 2026.</p>
                                                    </div>
                                                    <div className="bg-black/30 p-3 rounded-lg">
                                                        <p className="font-semibold text-purple-200 mb-1">Signal 2 (Barrier to Entry):</p>
                                                        <p className="text-purple-100">Average cost of bringing a BCI device to market exceeds <span className="font-bold">$200M</span> due to compliance requirements and clinical trial mandates.</p>
                                                    </div>
                                                    <div className="bg-black/30 p-3 rounded-lg">
                                                        <p className="font-semibold text-purple-200 mb-1">Signal 3 (Market Consolidation):</p>
                                                        <p className="text-purple-100">Fewer than <span className="font-bold">15 companies worldwide</span> hold BCI device approvals in major markets by 2028, indicating high concentration.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Scenario 4: The Neural Revolution */}
                                <div className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 p-6 rounded-xl border-2 border-green-400/30">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="bg-green-500 p-3 rounded-xl">
                                            <Brain className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <h4 className="text-2xl font-bold text-green-300">{scenarios.scenario4.name}</h4>
                                            <p className="text-sm text-green-200 italic">{scenarios.scenario4.tagline}</p>
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            <div className="group relative">
                                                <h5 className="text-lg font-bold text-green-300 flex items-center gap-2 cursor-help">
                                                    <Globe className="w-6 h-6" />
                                                    External Impact: Industry Dynamics
                                                    <span className="ml-1 text-xs text-green-400">ⓘ</span>
                                                </h5>
                                                {/* Tooltip */}
                                                <div className="absolute left-0 top-full mt-2 w-80 bg-gray-900 text-white text-xs p-3 rounded-lg shadow-xl border border-green-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                                                    <span className="font-semibold text-green-300">What this analyzes:</span> How this scenario reshapes the competitive landscape using Porter's 6 Forces. Compare present vs. future to identify which industry dynamics intensify, weaken, or shift—revealing strategic threats and opportunities external to your organization.
                                                </div>
                                            </div>

                                            <div className="bg-black/30 p-4 rounded-lg">
                                                <p className="text-base font-bold text-green-200 mb-3">Porter's 6 Forces Analysis:</p>

                                                {/* Radar Chart */}
                                                <div className="flex justify-center mb-4">
                                                    <svg viewBox="0 0 400 380" className="w-full h-80">
                                                        {/* Background circles */}
                                                        <circle cx="200" cy="190" r="120" fill="none" stroke="#4a5568" strokeWidth="0.5" opacity="0.3" />
                                                        <circle cx="200" cy="190" r="90" fill="none" stroke="#4a5568" strokeWidth="0.5" opacity="0.3" />
                                                        <circle cx="200" cy="190" r="60" fill="none" stroke="#4a5568" strokeWidth="0.5" opacity="0.3" />
                                                        <circle cx="200" cy="190" r="30" fill="none" stroke="#4a5568" strokeWidth="0.5" opacity="0.3" />

                                                        {/* Axis lines */}
                                                        <line x1="200" y1="190" x2="200" y2="70" stroke="#6b7280" strokeWidth="1" />
                                                        <line x1="200" y1="190" x2="304" y2="133" stroke="#6b7280" strokeWidth="1" />
                                                        <line x1="200" y1="190" x2="304" y2="247" stroke="#6b7280" strokeWidth="1" />
                                                        <line x1="200" y1="190" x2="200" y2="310" stroke="#6b7280" strokeWidth="1" />
                                                        <line x1="200" y1="190" x2="96" y2="247" stroke="#6b7280" strokeWidth="1" />
                                                        <line x1="200" y1="190" x2="96" y2="133" stroke="#6b7280" strokeWidth="1" />

                                                        {/* Present (2025) polygon - Orange */}
                                                        <polygon
                                                            points="200,118 242,154 260,208 200,238 140,208 158,154"
                                                            fill="#fb923c"
                                                            fillOpacity="0.25"
                                                            stroke="#fb923c"
                                                            strokeWidth="2"
                                                            strokeDasharray="5,3"
                                                        />

                                                        {/* Scenario 4: The Augmented Age (2035) - Green */}
                                                        <polygon
                                                            points="200,88 280,172 290,217 200,244 110,217 108,172"
                                                            fill="#22c55e"
                                                            fillOpacity="0.35"
                                                            stroke="#22c55e"
                                                            strokeWidth="2.5"
                                                        />

                                                        {/* Labels */}
                                                        <text x="200" y="55" textAnchor="middle" fill="#86efac" fontSize="10" fontWeight="bold">Threat of</text>
                                                        <text x="200" y="67" textAnchor="middle" fill="#86efac" fontSize="10" fontWeight="bold">New Entrants</text>

                                                        <text x="315" y="128" textAnchor="start" fill="#86efac" fontSize="10" fontWeight="bold">Supplier</text>
                                                        <text x="315" y="140" textAnchor="start" fill="#86efac" fontSize="10" fontWeight="bold">Power</text>

                                                        <text x="315" y="247" textAnchor="start" fill="#86efac" fontSize="10" fontWeight="bold">Buyer</text>
                                                        <text x="315" y="259" textAnchor="start" fill="#86efac" fontSize="10" fontWeight="bold">Power</text>

                                                        <text x="200" y="330" textAnchor="middle" fill="#86efac" fontSize="10" fontWeight="bold">Threat of</text>
                                                        <text x="200" y="342" textAnchor="middle" fill="#86efac" fontSize="10" fontWeight="bold">Substitutes</text>

                                                        <text x="85" y="247" textAnchor="end" fill="#86efac" fontSize="10" fontWeight="bold">Competitive</text>
                                                        <text x="85" y="259" textAnchor="end" fill="#86efac" fontSize="10" fontWeight="bold">Rivalry</text>

                                                        <text x="85" y="133" textAnchor="end" fill="#86efac" fontSize="10" fontWeight="bold">Complementors</text>

                                                        {/* Center label */}
                                                        <text x="200" y="193" textAnchor="middle" fill="#9ca3af" fontSize="9">Low</text>
                                                        <circle cx="200" cy="190" r="3" fill="#6b7280" opacity="0.5" />
                                                    </svg>
                                                </div>

                                                {/* Legend */}
                                                <div className="space-y-3 text-xs">
                                                    <div className="flex items-center gap-3 justify-center">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-4 h-0.5 bg-orange-400 border-2 border-orange-400" style={{ borderStyle: 'dashed' }}></div>
                                                            <span className="text-orange-300 font-semibold">Present (2025)</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-4 h-1 bg-green-500"></div>
                                                            <span className="text-green-300 font-semibold">Scenario (2035)</span>
                                                        </div>
                                                    </div>

                                                    {/* Key Insight Box */}
                                                    <div className="bg-green-900/40 p-3 rounded-lg border border-green-400/40">
                                                        <p className="text-xs font-semibold text-green-300 mb-2 flex items-center gap-2">
                                                            <span className="text-yellow-400">💡</span> Key Strategic Shift:
                                                        </p>
                                                        <p className="text-[11px] text-green-100 leading-relaxed">
                                                            Mainstream adoption creates a <span className="font-semibold text-green-300">platform war ecosystem</span>. Tech giants enter (threat of new entrants 60%→85%), rivalry intensifies dramatically (70%→90%), and a rich complementor ecosystem emerges (50%→90%). Buyer power surges (50%→75%) with abundant choice, while hardware commoditizes (supplier power 40%→15%).
                                                        </p>
                                                    </div>

                                                    {/* Force-by-Force Breakdown */}
                                                    <div className="mt-3 pt-3 border-t border-green-400/20">
                                                        <p className="text-[10px] text-green-300 mb-2 italic text-center">Hover over each force for detailed explanation</p>
                                                        <div className="grid grid-cols-2 gap-2">
                                                            <div className="group relative cursor-help bg-gray-800/30 p-2 rounded">
                                                                <div className="flex justify-between text-[10px]">
                                                                    <span className="text-green-200">New Entrants</span>
                                                                    <span className="text-green-300">60%→85%</span>
                                                                </div>
                                                                <div className="absolute left-0 top-full mt-2 w-64 bg-gray-900 text-white text-xs p-2 rounded-lg shadow-xl border border-green-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                                                                    <span className="font-semibold text-green-300">Why HIGH (85%):</span> Mass consumer market attracts Apple, Meta, Google, and other tech giants. Their brand power, distribution networks, and deep pockets make them formidable new entrants challenging medical-device incumbents.
                                                                </div>
                                                            </div>
                                                            <div className="group relative cursor-help bg-gray-800/30 p-2 rounded">
                                                                <div className="flex justify-between text-[10px]">
                                                                    <span className="text-green-200">Supplier Power</span>
                                                                    <span className="text-green-300">80%→15%</span>
                                                                </div>
                                                                <div className="absolute left-0 top-full mt-2 w-64 bg-gray-900 text-white text-xs p-2 rounded-lg shadow-xl border border-green-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                                                                    <span className="font-semibold text-green-300">Why VERY LOW (15%):</span> Non-invasive BCIs dominate, eliminating neurosurgeon dependency. Hardware components become standardized and commoditized. Suppliers have minimal leverage in a scaled consumer market.
                                                                </div>
                                                            </div>
                                                            <div className="group relative cursor-help bg-gray-800/30 p-2 rounded">
                                                                <div className="flex justify-between text-[10px]">
                                                                    <span className="text-green-200">Buyer Power</span>
                                                                    <span className="text-green-300">50%→75%</span>
                                                                </div>
                                                                <div className="absolute left-0 top-full mt-2 w-64 bg-gray-900 text-white text-xs p-2 rounded-lg shadow-xl border border-green-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                                                                    <span className="font-semibold text-green-300">Why HIGH (75%):</span> Consumers face abundant choice from multiple competing platforms. Low switching costs and transparent pricing give buyers strong negotiating power. Must compete on features and price.
                                                                </div>
                                                            </div>
                                                            <div className="group relative cursor-help bg-gray-800/30 p-2 rounded">
                                                                <div className="flex justify-between text-[10px]">
                                                                    <span className="text-green-200">Substitutes</span>
                                                                    <span className="text-green-300">40%→65%</span>
                                                                </div>
                                                                <div className="absolute left-0 top-full mt-2 w-64 bg-gray-900 text-white text-xs p-2 rounded-lg shadow-xl border border-green-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                                                                    <span className="font-semibold text-green-300">Why MODERATE (65%):</span> Advanced AI, AR/VR, and other cognitive enhancement tools compete for consumer attention. BCIs aren't the only path to augmentation. Substitutes are viable for many use cases.
                                                                </div>
                                                            </div>
                                                            <div className="group relative cursor-help bg-gray-800/30 p-2 rounded">
                                                                <div className="flex justify-between text-[10px]">
                                                                    <span className="text-green-200">Rivalry</span>
                                                                    <span className="text-green-300">70%→90%</span>
                                                                </div>
                                                                <div className="absolute left-0 top-full mt-2 w-64 bg-gray-900 text-white text-xs p-2 rounded-lg shadow-xl border border-green-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                                                                    <span className="font-semibold text-green-300">Why VERY HIGH (90%):</span> "Platform wars" create intense competition. Tech giants battle for market share, ecosystem control, and data advantage. Aggressive marketing, R&D races, and platform lock-in strategies drive extreme rivalry.
                                                                </div>
                                                            </div>
                                                            <div className="group relative cursor-help bg-gray-800/30 p-2 rounded">
                                                                <div className="flex justify-between text-[10px]">
                                                                    <span className="text-green-200">Complementors</span>
                                                                    <span className="text-green-300">40%→90%</span>
                                                                </div>
                                                                <div className="absolute left-0 top-full mt-2 w-64 bg-gray-900 text-white text-xs p-2 rounded-lg shadow-xl border border-green-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                                                                    <span className="font-semibold text-green-300">Why VERY HIGH (90%):</span> Thriving app ecosystem, AI developers, content creators, and integration partners become critical. Success depends on attracting the best complementors to your platform. Network effects rule.
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="bg-green-900/30 p-4 rounded-lg border border-green-500/30">
                                                <p className="text-base font-bold text-green-300 mb-2 flex items-center gap-2">
                                                    <CheckCircle className="w-5 h-5" />
                                                    Opportunities
                                                </p>
                                                <ul className="space-y-1 text-xs text-green-100">
                                                    <li>• Exponential market growth</li>
                                                    <li>• Platform play (BCI + AI ecosystem)</li>
                                                    <li>• New revenue streams (subscriptions, apps)</li>
                                                </ul>
                                            </div>

                                            <div className="bg-red-900/30 p-4 rounded-lg border border-red-500/30">
                                                <p className="text-base font-bold text-red-300 mb-2 flex items-center gap-2">
                                                    <XCircle className="w-5 h-5" />
                                                    Threats
                                                </p>
                                                <ul className="space-y-1 text-xs text-red-100">
                                                    <li>• Tech giants leverage existing platforms</li>
                                                    <li>• Hardware commoditization</li>
                                                    <li>• Skills gap in AI/software capabilities</li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="group relative">
                                                <h5 className="text-lg font-bold text-green-300 flex items-center gap-2 cursor-help">
                                                    <Shield className="w-6 h-6" />
                                                    Internal Impact: Our Capabilities
                                                    <span className="ml-1 text-xs text-green-400">ⓘ</span>
                                                </h5>
                                                {/* Tooltip */}
                                                <div className="absolute left-0 top-full mt-2 w-80 bg-gray-900 text-white text-xs p-3 rounded-lg shadow-xl border border-green-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                                                    <span className="font-semibold text-green-300">What this analyzes:</span> How this scenario changes the strategic value of your current capabilities. Some capabilities become "crown jewels" (critically valuable), others become "commodities" (less differentiating), and gaps emerge. This reveals what to invest in, divest from, or build.
                                                </div>
                                            </div>

                                            <div className="bg-black/30 p-4 rounded-lg">
                                                <p className="text-base font-bold text-green-200 mb-3">Capability Re-evaluation:
                                                    <span className="ml-2 text-green-300 italic text-xs">(Hover over bars for interpretation)</span>
                                                </p>
                                                <div className="space-y-4">
                                                    <div className="group relative bg-gray-800/40 p-3 rounded-lg border border-gray-700/30">
                                                        <div className="flex justify-between text-xs mb-3">
                                                            <span className="text-green-200 font-semibold text-sm">AI/ML Capabilities</span>
                                                            <span className="text-green-300">↑ Essential</span>
                                                        </div>
                                                        {/* Present (2025) Bar */}
                                                        <div className="mb-1">
                                                            <div className="flex justify-between text-[10px] mb-0.5">
                                                                <span className="text-orange-300">Present (2025)</span>
                                                                <span className="text-orange-300">65%</span>
                                                            </div>
                                                            <div className="w-full bg-gray-700 rounded-full h-1.5">
                                                                <div className="bg-orange-400 h-1.5 rounded-full" style={{ width: '65%' }}></div>
                                                            </div>
                                                        </div>
                                                        {/* Scenario (2035) Bar */}
                                                        <div className="cursor-help">
                                                            <div className="flex justify-between text-[10px] mb-0.5">
                                                                <span className="text-green-300">Scenario (2035)</span>
                                                                <span className="text-green-300">95%</span>
                                                            </div>
                                                            <div className="w-full bg-gray-700 rounded-full h-1.5">
                                                                <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '95%' }}></div>
                                                            </div>
                                                        </div>
                                                        {/* Tooltip */}
                                                        <div className="absolute left-0 top-full mt-2 w-72 bg-gray-900 text-white text-xs p-3 rounded-lg shadow-xl border border-green-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                                                            <span className="font-semibold text-green-300">Strategic Shift:</span> In a world where non-invasive BCIs work seamlessly, the competitive battleground shifts from hardware to software/AI. Signal processing, personalized neural models, and BCI-AI integration become the ultimate differentiators. Value soars from 65% to 95%.
                                                        </div>
                                                    </div>
                                                    <div className="group relative bg-gray-800/40 p-3 rounded-lg border border-gray-700/30">
                                                        <div className="flex justify-between text-xs mb-3">
                                                            <span className="text-green-200 font-semibold text-sm">Consumer Marketing & Brand</span>
                                                            <span className="text-green-300">↑ Critical</span>
                                                        </div>
                                                        {/* Present (2025) Bar */}
                                                        <div className="mb-1">
                                                            <div className="flex justify-between text-[10px] mb-0.5">
                                                                <span className="text-orange-300">Present (2025)</span>
                                                                <span className="text-orange-300">40%</span>
                                                            </div>
                                                            <div className="w-full bg-gray-700 rounded-full h-1.5">
                                                                <div className="bg-orange-400 h-1.5 rounded-full" style={{ width: '40%' }}></div>
                                                            </div>
                                                        </div>
                                                        {/* Scenario (2035) Bar */}
                                                        <div className="cursor-help">
                                                            <div className="flex justify-between text-[10px] mb-0.5">
                                                                <span className="text-green-300">Scenario (2035)</span>
                                                                <span className="text-green-300">85%</span>
                                                            </div>
                                                            <div className="w-full bg-gray-700 rounded-full h-1.5">
                                                                <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '85%' }}></div>
                                                            </div>
                                                        </div>
                                                        {/* Tooltip */}
                                                        <div className="absolute left-0 top-full mt-2 w-72 bg-gray-900 text-white text-xs p-3 rounded-lg shadow-xl border border-green-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                                                            <span className="font-semibold text-green-300">Strategic Shift:</span> BCIs transition from medical devices to consumer electronics (like smartphones). Success requires mass-market branding, lifestyle positioning, and competing with tech giants (Meta, Apple) - our medical device identity becomes a limitation. Jumps from 40% to 85%.
                                                        </div>
                                                    </div>
                                                    <div className="group relative bg-gray-800/40 p-3 rounded-lg border border-gray-700/30">
                                                        <div className="flex justify-between text-xs mb-3">
                                                            <span className="text-green-200 font-semibold text-sm">Manufacturing Scale</span>
                                                            <span className="text-green-300">↑ Essential</span>
                                                        </div>
                                                        {/* Present (2025) Bar */}
                                                        <div className="mb-1">
                                                            <div className="flex justify-between text-[10px] mb-0.5">
                                                                <span className="text-orange-300">Present (2025)</span>
                                                                <span className="text-orange-300">50%</span>
                                                            </div>
                                                            <div className="w-full bg-gray-700 rounded-full h-1.5">
                                                                <div className="bg-orange-400 h-1.5 rounded-full" style={{ width: '50%' }}></div>
                                                            </div>
                                                        </div>
                                                        {/* Scenario (2035) Bar */}
                                                        <div className="cursor-help">
                                                            <div className="flex justify-between text-[10px] mb-0.5">
                                                                <span className="text-green-300">Scenario (2035)</span>
                                                                <span className="text-green-300">80%</span>
                                                            </div>
                                                            <div className="w-full bg-gray-700 rounded-full h-1.5">
                                                                <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '80%' }}></div>
                                                            </div>
                                                        </div>
                                                        {/* Tooltip */}
                                                        <div className="absolute left-0 top-full mt-2 w-72 bg-gray-900 text-white text-xs p-3 rounded-lg shadow-xl border border-green-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                                                            <span className="font-semibold text-green-300">Strategic Shift:</span> With mainstream adoption and non-invasive devices dominating, the ability to manufacture millions of consumer units at competitive prices becomes critical - this is smartphone-scale production, not boutique medical devices. Rises from 50% to 80%.
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="bg-black/30 p-4 rounded-lg">
                                                <div className="group relative mb-4">
                                                    <p className="text-base font-bold text-green-200 cursor-help inline-flex items-center gap-2">
                                                        Strategic Position Shifts:
                                                        <span className="text-xs text-green-300">ⓘ</span>
                                                    </p>
                                                    {/* Tooltip */}
                                                    <div className="absolute left-0 top-full mt-2 w-80 bg-gray-900 text-white text-xs p-3 rounded-lg shadow-xl border border-green-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                                                        <span className="font-semibold text-green-300">What this analyzes:</span> By combining external industry changes with internal capability shifts, this shows how your competitive position evolves in this scenario. It identifies new strengths (moats), emerging weaknesses (vulnerabilities), and strategic inflection points requiring decisive action.
                                                    </div>
                                                </div>
                                                <div className="space-y-2 text-xs">
                                                    <div className="flex items-start gap-2">
                                                        <AlertTriangle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                                                        <p className="text-green-100"><span className="font-semibold">Identity Crisis:</span> Medical device company vs. consumer tech platform?</p>
                                                    </div>
                                                    <div className="flex items-start gap-2">
                                                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                                                        <p className="text-green-100"><span className="font-semibold">First-Mover:</span> Early medical credibility could translate to consumer trust</p>
                                                    </div>
                                                    <div className="flex items-start gap-2">
                                                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                                                        <p className="text-green-100"><span className="font-semibold">Portfolio Synergy Unlocked:</span> All three divisions (medical 70%, cognitive enhancement 20%, AI-Brain integration 10%) become strategic assets as markets converge</p>
                                                    </div>
                                                    <div className="flex items-start gap-2">
                                                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                                                        <p className="text-green-100"><span className="font-semibold">AI-Brain Integration Breakthrough:</span> Our 10% revenue experimental division becomes high-growth differentiator in consumer augmentation race</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Early Warning Indicators */}
                                            <div className="mt-6 bg-green-950/50 p-5 rounded-lg border-2 border-green-400/40">
                                                <h5 className="font-bold text-green-200 mb-3 flex items-center gap-2">
                                                    <AlertCircle className="w-5 h-5" />
                                                    Early Warning Indicators: Triggers for "The Neural Revolution"
                                                </h5>
                                                <p className="text-xs text-green-200 mb-4 italic">This scenario emerges when a convergence of 4 indicators reaches their thresholds:</p>
                                                <div className="space-y-3 text-sm">
                                                    <div className="bg-black/30 p-3 rounded-lg">
                                                        <p className="font-semibold text-green-200 mb-1">Signal 1 (Consumer Adoption):</p>
                                                        <p className="text-green-100">Non-invasive consumer BCI adoption exceeds <span className="font-bold">50 million active users</span> globally by 2027, with &gt;30% year-on-year growth.</p>
                                                    </div>
                                                    <div className="bg-black/30 p-3 rounded-lg">
                                                        <p className="font-semibold text-green-200 mb-1">Signal 2 (Regulatory Support):</p>
                                                        <p className="text-green-100">At least <span className="font-bold">3 major markets</span> establish fast-track approval pathways specifically for consumer augmentation BCIs by 2026.</p>
                                                    </div>
                                                    <div className="bg-black/30 p-3 rounded-lg">
                                                        <p className="font-semibold text-green-200 mb-1">Signal 3 (Big Tech Entry):</p>
                                                        <p className="text-green-100">More than <span className="font-bold">5 major tech companies</span> (e.g., Apple, Google, Meta, Microsoft, Amazon) launch commercial BCI products by 2028.</p>
                                                    </div>
                                                    <div className="bg-black/30 p-3 rounded-lg">
                                                        <p className="font-semibold text-green-200 mb-1">Signal 4 (Investment Surge):</p>
                                                        <p className="text-green-100">Total VC and corporate investment in BCI technology exceeds <span className="font-bold">$50B annually</span> across all three categories (medical, cognitive enhancement, AI-Brain) by 2027.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Key Teaching Points for Stage 7 */}
                            <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 p-6 rounded-xl border-2 border-indigo-400/30">
                                <div className="flex items-start gap-4">
                                    <div className="bg-indigo-500 p-3 rounded-xl">
                                        <Lightbulb className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-indigo-300 mb-3">Key Teaching Points for Your Project:</h3>
                                        <div className="space-y-2 text-sm text-indigo-100">
                                            <p className="bg-black/20 p-3 rounded-lg">
                                                <span className="font-semibold text-indigo-200">Use Visual Frameworks:</span> Notice how we used capability bar charts, Porter's Forces snapshots, and opportunities/threats boxes rather than lengthy text. Your analysis should be similarly visual and scannable.
                                            </p>
                                            <p className="bg-black/20 p-3 rounded-lg">
                                                <span className="font-semibold text-indigo-200">External + Internal:</span> Each scenario requires BOTH industry-level analysis (external) and capability assessment (internal). Don't skip either dimension.
                                            </p>
                                            <p className="bg-black/20 p-3 rounded-lg">
                                                <span className="font-semibold text-indigo-200">Core Competence → Core Rigidity:</span> Show how the value of existing capabilities changes. What's valuable today may become a liability in a different future (e.g., regulatory expertise in "Wild West").
                                            </p>
                                            <p className="bg-indigo-900/50 p-4 rounded-lg border-2 border-indigo-400/50 font-semibold text-white">
                                                🎯 Stage 7 focuses on scenario-by-scenario impact analysis. In Stage 8, you'll synthesize these insights into an overall preparedness verdict.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Next Step */}
                            <div className="bg-purple-900/30 p-5 rounded-xl border border-purple-400/30 text-center">
                                <p className="text-purple-200 text-sm">
                                    <span className="font-semibold text-purple-300">Next:</span> In Stage 8, you'll deliver a holistic verdict on strategic preparedness across all scenarios, identifying critical capability gaps.
                                </p>
                            </div>

                            {/* Navigation Button */}
                            <div className="flex justify-center mt-8">
                                <button
                                    onClick={() => setActiveStage(7)}
                                    className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-bold text-lg hover:scale-105 transition-transform shadow-lg"
                                >
                                    Continue to Stage 8: Delivering a Verdict on Preparedness
                                    <ArrowRight className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Dashboard Introduction: Strategic Preparedness */}
                    {activeStage === 7 && (
                        <div className="space-y-8">
                            <div className="text-center space-y-4">
                                <div className="inline-block bg-gradient-to-r from-yellow-500 to-orange-500 p-4 rounded-2xl">
                                    <BarChart3 className="w-12 h-12" />
                                </div>
                                <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                                    Stage 8: Delivering a Verdict on Preparedness
                                </h2>
                                <p className="text-xl text-yellow-200 max-w-4xl mx-auto">
                                    Synthesizing our scenario analysis into a holistic assessment of strategic readiness
                                </p>
                            </div>

                            {/* Strategic Preparedness Verdict */}
                            <div className="bg-gradient-to-br from-yellow-900/50 to-orange-900/50 p-8 rounded-xl border-2 border-yellow-400/40">
                                <div className="text-center mb-6">
                                    <h3 className="text-3xl font-bold text-yellow-300 mb-2">Strategic Preparedness Verdict</h3>
                                    <p className="text-yellow-100">How ready is NeuraForge X to forge the future across these four scenarios?</p>
                                </div>

                                {/* Radar Chart Visualization */}
                                <div className="grid md:grid-cols-2 gap-8 mb-6">
                                    <div className="bg-black/30 p-6 rounded-lg">
                                        <div className="group relative mb-4">
                                            <h4 className="font-bold text-yellow-300 text-center cursor-help">
                                                Strategic Capability Readiness
                                                <span className="ml-1 text-xs text-yellow-400">ⓘ</span>
                                            </h4>
                                            {/* Tooltip */}
                                            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-80 bg-gray-900 text-white text-xs p-3 rounded-lg shadow-xl border border-yellow-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                                                <span className="font-semibold text-yellow-300">What this assesses:</span> How well your current capabilities align with what's needed across ALL scenarios. Each dimension is evaluated based on its strength AND relevance across multiple future states. High readiness = capability is strong and valuable in many scenarios. Low readiness = critical gap that exposes you to strategic risk.
                                            </div>
                                        </div>
                                        <p className="text-[10px] text-yellow-200 text-center mb-3 italic">Hover over each capability for assessment details</p>
                                        <div className="space-y-4">
                                            <div className="group relative cursor-help">
                                                <div className="flex justify-between text-sm mb-2">
                                                    <span className="text-yellow-200">Regulatory Navigation</span>
                                                    <span className="text-green-300 font-semibold">Strong</span>
                                                </div>
                                                <div className="w-full bg-gray-700 rounded-full h-3">
                                                    <div className="bg-green-500 h-3 rounded-full" style={{ width: '85%' }}></div>
                                                </div>
                                                {/* Tooltip */}
                                                <div className="absolute left-0 top-full mt-2 w-80 bg-gray-900 text-white text-xs p-3 rounded-lg shadow-xl border border-green-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                                                    <span className="font-semibold text-green-300">Why Strong (85%):</span> Your deep expertise navigating FDA/CE approval processes is valuable across ALL scenarios—from slow-growth medical markets to fast-paced consumer adoption. Regulatory capability remains critical regardless of which future unfolds. This is a robust, scenario-proof strength.
                                                </div>
                                            </div>
                                            <div className="group relative cursor-help">
                                                <div className="flex justify-between text-sm mb-2">
                                                    <span className="text-yellow-200">Surgical Partnerships</span>
                                                    <span className="text-green-300 font-semibold">Strong</span>
                                                </div>
                                                <div className="w-full bg-gray-700 rounded-full h-3">
                                                    <div className="bg-green-500 h-3 rounded-full" style={{ width: '80%' }}></div>
                                                </div>
                                                {/* Tooltip */}
                                                <div className="absolute left-0 top-full mt-2 w-80 bg-gray-900 text-white text-xs p-3 rounded-lg shadow-xl border border-green-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                                                    <span className="font-semibold text-green-300">Why Strong (80%):</span> Your established relationships with neurosurgeons are critical for invasive BCI adoption across multiple scenarios. Even in consumer-focused futures, medical partnerships provide credibility, clinical data, and a foundation for broader market entry. A key strategic asset.
                                                </div>
                                            </div>
                                            <div className="group relative cursor-help">
                                                <div className="flex justify-between text-sm mb-2">
                                                    <span className="text-yellow-200">R&D & Product Innovation</span>
                                                    <span className="text-blue-300 font-semibold">Moderate</span>
                                                </div>
                                                <div className="w-full bg-gray-700 rounded-full h-3">
                                                    <div className="bg-blue-500 h-3 rounded-full" style={{ width: '70%' }}></div>
                                                </div>
                                                {/* Tooltip */}
                                                <div className="absolute left-0 top-full mt-2 w-80 bg-gray-900 text-white text-xs p-3 rounded-lg shadow-xl border border-blue-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                                                    <span className="font-semibold text-blue-300">Why Moderate (70%):</span> Your R&D is solid for medical applications but needs strengthening for scenarios demanding rapid innovation or consumer-grade products. In high-tech-progress futures (Scenarios 2 & 4), competitors with stronger innovation engines could outpace you. A capability gap to address.
                                                </div>
                                            </div>
                                            <div className="group relative cursor-help">
                                                <div className="flex justify-between text-sm mb-2">
                                                    <span className="text-yellow-200">Consumer Marketing & Distribution</span>
                                                    <span className="text-red-300 font-semibold">Weak</span>
                                                </div>
                                                <div className="w-full bg-gray-700 rounded-full h-3">
                                                    <div className="bg-red-500 h-3 rounded-full" style={{ width: '35%' }}></div>
                                                </div>
                                                {/* Tooltip */}
                                                <div className="absolute left-0 top-full mt-2 w-80 bg-gray-900 text-white text-xs p-3 rounded-lg shadow-xl border border-red-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                                                    <span className="font-semibold text-red-300">Why Weak (35%):</span> Your medical B2B2C model lacks consumer brand-building and mass distribution capabilities. In Scenario 4 (mass consumer adoption), this is a CRITICAL vulnerability. Even in medical-focused scenarios, building direct patient awareness is becoming important. Urgent strategic gap.
                                                </div>
                                            </div>
                                            <div className="group relative cursor-help">
                                                <div className="flex justify-between text-sm mb-2">
                                                    <span className="text-yellow-200">AI/Software Capabilities</span>
                                                    <span className="text-red-300 font-semibold">Weak</span>
                                                </div>
                                                <div className="w-full bg-gray-700 rounded-full h-3">
                                                    <div className="bg-red-500 h-3 rounded-full" style={{ width: '40%' }}></div>
                                                </div>
                                                {/* Tooltip */}
                                                <div className="absolute left-0 top-full mt-2 w-80 bg-gray-900 text-white text-xs p-3 rounded-lg shadow-xl border border-red-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                                                    <span className="font-semibold text-red-300">Why Weak (40%):</span> Advanced AI/ML for signal processing and personalization is becoming table stakes. In fast-paced innovation scenarios (2 & 4), tech giants with deep AI expertise pose existential threats. Your hardware focus leaves you vulnerable to software-led disruption. Critical investment needed.
                                                </div>
                                            </div>
                                            <div className="group relative cursor-help">
                                                <div className="flex justify-between text-sm mb-2">
                                                    <span className="text-yellow-200">Organizational Agility & Execution</span>
                                                    <span className="text-blue-300 font-semibold">Moderate</span>
                                                </div>
                                                <div className="w-full bg-gray-700 rounded-full h-3">
                                                    <div className="bg-blue-500 h-3 rounded-full" style={{ width: '60%' }}></div>
                                                </div>
                                                {/* Tooltip */}
                                                <div className="absolute left-0 top-full mt-2 w-80 bg-gray-900 text-white text-xs p-3 rounded-lg shadow-xl border border-blue-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                                                    <span className="font-semibold text-blue-300">Why Moderate (60%):</span> Your ability to pivot strategy and execute quickly is adequate for slow-moving medical scenarios but insufficient for fast-paced consumer markets. In high-uncertainty futures requiring rapid strategic shifts, your organizational speed could be a limiting factor. Room for improvement.
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-black/30 p-6 rounded-lg">
                                        <div className="group relative mb-4">
                                            <h4 className="font-bold text-yellow-300 text-center cursor-help">
                                                Readiness by Scenario
                                                <span className="ml-1 text-xs text-yellow-400">ⓘ</span>
                                            </h4>
                                            {/* Tooltip */}
                                            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-80 bg-gray-900 text-white text-xs p-3 rounded-lg shadow-xl border border-yellow-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                                                <span className="font-semibold text-yellow-300">What this assesses:</span> Your overall strategic fitness for each specific future scenario. This aggregates your capability strengths/weaknesses to show which futures you're best positioned for. High % = your capabilities align well with what that scenario demands. Low % = significant capability gaps for that future state.
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div>
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-sm text-blue-200 font-semibold">The Hesitant Dawn</span>
                                                    <span className="text-blue-300 font-bold">75%</span>
                                                </div>
                                                <div className="w-full bg-gray-700 rounded-full h-3">
                                                    <div className="bg-blue-500 h-3 rounded-full" style={{ width: '75%' }}></div>
                                                </div>
                                                <p className="text-xs text-blue-100 mt-1">Well-positioned for slow-growth medical market; regulatory expertise is key strength</p>
                                            </div>
                                            <div>
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-sm text-orange-200 font-semibold">The Forbidden Frontier</span>
                                                    <span className="text-yellow-300 font-bold">55%</span>
                                                </div>
                                                <div className="w-full bg-gray-700 rounded-full h-3">
                                                    <div className="bg-yellow-500 h-3 rounded-full" style={{ width: '55%' }}></div>
                                                </div>
                                                <p className="text-xs text-orange-100 mt-1">Strong tech capabilities but challenged by regulatory fragmentation and gray markets</p>
                                            </div>
                                            <div>
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-sm text-purple-200 font-semibold">The Waiting World</span>
                                                    <span className="text-green-300 font-bold">85%</span>
                                                </div>
                                                <div className="w-full bg-gray-700 rounded-full h-3">
                                                    <div className="bg-green-500 h-3 rounded-full" style={{ width: '85%' }}></div>
                                                </div>
                                                <p className="text-xs text-purple-100 mt-1">Best prepared - surgical partnerships and premium positioning align perfectly</p>
                                            </div>
                                            <div>
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-sm text-green-200 font-semibold">The Augmented Age</span>
                                                    <span className="text-red-300 font-bold">40%</span>
                                                </div>
                                                <div className="w-full bg-gray-700 rounded-full h-3">
                                                    <div className="bg-red-500 h-3 rounded-full" style={{ width: '40%' }}></div>
                                                </div>
                                                <p className="text-xs text-green-100 mt-1">Highest risk - lacking consumer marketing and AI/software capabilities for mass market</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Strategic Gaps Summary */}
                                <div className="bg-red-900/40 p-6 rounded-lg border-2 border-red-400/50">
                                    <div className="group relative mb-4">
                                        <h4 className="font-bold text-red-300 flex items-center gap-2 cursor-help">
                                            <AlertTriangle className="w-6 h-6" />
                                            Critical Strategic Gaps Identified
                                            <span className="ml-1 text-xs text-red-400">ⓘ</span>
                                        </h4>
                                        {/* Tooltip */}
                                        <div className="absolute left-0 top-full mt-2 w-96 bg-gray-900 text-white text-xs p-3 rounded-lg shadow-xl border border-red-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                                            <span className="font-semibold text-red-300">What this identifies:</span> By comparing where we are strong today against where we need to excel across all scenarios, this reveals our most dangerous capability gaps - the "blind spots" that could leave us vulnerable regardless of which future unfolds. These are urgent strategic priorities requiring immediate investment.
                                        </div>
                                    </div>
                                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                                        <div className="bg-black/30 p-4 rounded-lg">
                                            <p className="font-semibold text-red-200 mb-2">1. Consumer Market Capabilities</p>
                                            <p className="text-xs text-red-100">Weak brand awareness, limited consumer marketing expertise, no consumer distribution channels</p>
                                        </div>
                                        <div className="bg-black/30 p-4 rounded-lg">
                                            <p className="font-semibold text-red-200 mb-2">2. AI/Software Platform</p>
                                            <p className="text-xs text-red-100">Hardware-focused; lacking AI/ML talent, software ecosystem, platform strategy</p>
                                        </div>
                                        <div className="bg-black/30 p-4 rounded-lg">
                                            <p className="font-semibold text-red-200 mb-2">3. Surgical Scalability</p>
                                            <p className="text-xs text-red-100">Bottlenecked by limited neurosurgeon network and 6-8hr procedures without automation plan</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Key Teaching Points for Stage 8 */}
                            <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 p-6 rounded-xl border-2 border-indigo-400/30">
                                <div className="flex items-start gap-4">
                                    <div className="bg-indigo-500 p-3 rounded-xl">
                                        <Lightbulb className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-indigo-300 mb-3">Key Teaching Points for Your Project:</h3>
                                        <div className="space-y-2 text-sm text-indigo-100">
                                            <p className="bg-black/20 p-3 rounded-lg">
                                                <span className="font-semibold text-indigo-200">Synthesize, Don't Repeat:</span> Stage 8 is NOT a summary of Stage 7. It's a holistic verdict that synthesizes insights across ALL scenarios to deliver an overall preparedness assessment.
                                            </p>
                                            <p className="bg-black/20 p-3 rounded-lg">
                                                <span className="font-semibold text-indigo-200">Define Your Criteria:</span> Choose 5-7 critical dimensions (e.g., regulatory navigation, consumer readiness, AI capabilities) and assess the company's readiness on each across all scenarios.
                                            </p>
                                            <p className="bg-black/20 p-3 rounded-lg">
                                                <span className="font-semibold text-indigo-200">Visualize Your Verdict:</span> Use radar charts, heatmaps, or comparative scorecards to make your assessment instantly clear and impactful.
                                            </p>
                                            <p className="bg-black/20 p-3 rounded-lg">
                                                <span className="font-semibold text-indigo-200">Identify Strategic Gaps:</span> The verdict must clearly highlight the company's critical capability deficits - these gaps become the foundation for your Section 4 recommendations. Be specific!
                                            </p>
                                            <p className="bg-indigo-900/50 p-4 rounded-lg border-2 border-indigo-400/50 font-semibold text-white">
                                                🎯 This stage is your analytical bridge from foresight (scenarios) to action (strategy). The gaps you identify here become the priorities you address in Section 4's Strategic Flexibility Initiatives.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Next Step */}
                            <div className="bg-purple-900/30 p-5 rounded-xl border border-purple-400/30 text-center">
                                <p className="text-purple-200 text-sm">
                                    <span className="font-semibold text-purple-300">Next:</span> In Section 4, you'll use these insights to craft an Integrated Strategic Map with immediate priorities, flexibility initiatives, and scenario-specific pathways.
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="mt-8 text-center space-y-3">
                    <div className="text-purple-300 text-sm">
                        <p className="font-semibold">MN32041 Strategic Management | Interactive Scenario Planning Demonstration</p>
                        <p className="mt-1">Developed for pedagogical purposes to illustrate practical application of strategic foresight methodologies</p>
                    </div>
                    <div className="border-t border-purple-500/30 pt-3">
                        <p className="text-purple-200 text-sm">
                            <span className="font-semibold">Developed By:</span> Dr. Bruno Oliveira
                        </p>
                        <p className="text-purple-300 text-xs mt-1">
                            Senior Lecturer at the University of Bath | Founder of Gustomind.ai
                        </p>
                        <p className="text-purple-400 text-xs mt-3">
                            © 2025 Dr. Bruno Oliveira. All Rights Reserved.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BCIScenarioPlanning;





