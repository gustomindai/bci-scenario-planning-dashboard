import React, { useState, useEffect, useRef } from 'react';
import { Brain, Calendar, Search, Network, Zap, AlertCircle, TrendingUp } from 'lucide-react';

const BCIScenarioPlanning = () => {
    const [activeStage, setActiveStage] = useState(0);
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
        'Technological': 'bg-green-700',
        'Legal': 'bg-yellow-700',
        'Environmental': 'bg-teal-700'
    };

    const pestleFactorColors = {
        'Political': 'bg-purple-500',
        'Economic': 'bg-blue-500',
        'Social': 'bg-pink-500',
        'Technological': 'bg-green-500',
        'Legal': 'bg-yellow-500',
        'Environmental': 'bg-teal-500'
    };

    const stages = [
        { id: 0, title: 'Focal Issue & Horizon', icon: Calendar },
        { id: 1, title: 'Scanning for Signals', icon: Search },
        { id: 2, title: 'Impact-Uncertainty Matrix', icon: TrendingUp },
        { id: 3, title: 'Mapping Connections', icon: Network }
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
            <div className={`mx-auto ${viewType === 'mindmap' && activeStage === 2 ? 'max-w-none' : 'max-w-7xl'}`}>
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
                                <span>Stage {stage.id + 1}: {stage.title}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Stage Content */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl">
                    {/* Stage 0: Focal Issue */}
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
                                <h3 className="text-xl font-bold mb-4">Justification for 2035 Horizon</h3>
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
                        </div>
                    )}

                    {/* Stage 1: Scanning for Signals */}
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
                                <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-xl overflow-x-auto overflow-y-auto" style={{ maxHeight: '1500px' }}>
                                    <div className="relative bg-purple-900/30 rounded-lg" style={{ width: '2600px', height: '1400px' }}>
                                            {/* Central Node */}
                                            <div className="absolute" style={{ left: '630px', top: '700px', transform: 'translate(-50%, -50%)', zIndex: 30 }}>
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
                                                    const categoryRadius = 330;
                                                    const cx = 630 + Math.cos(angle) * categoryRadius;
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
                                                                x1="630"
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
                                                                const subAngle = angle + ((uIdx - (totalFactors - 1) / 2) * 0.35);
                                                                const subRadius = 220;
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
                                                const categoryRadius = 330;
                                                const cx = 630 + Math.cos(angle) * categoryRadius;
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
                                                            const subAngle = angle + ((uIdx - (totalFactors - 1) / 2) * 0.35);
                                                            const subRadius = 220;
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
                                                    style={{ left: '630px', top: '20px', transform: 'translateX(-50%)', zIndex: 40 }}
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
                                            <div className="absolute text-sm text-center text-purple-200 bg-purple-800/30 p-3 rounded-lg max-w-3xl" style={{ left: '630px', bottom: '20px', transform: 'translateX(-50%)', zIndex: 5 }}>
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
                                            <li>• <span className="font-semibold">Be Comprehensive:</span> 49 factors across all PESTLE dimensions</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Stage 2: Impact-Uncertainty Matrix */}
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
                                                    className={`absolute rounded-full cursor-pointer transition-all ${dotColor} ${
                                                        isCritical ? 'ring-2 ' + ringColor : ''
                                                    } ${
                                                        selectedUncertainty?.id === u.id ? 'ring-4 ring-white scale-150' : ''
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
                        </div>
                    )}

                    {/* Stage 3: Mapping Connections */}
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

                                        return (
                                            <div
                                                key={driver.id}
                                                onMouseEnter={() => setHoveredDriver(driver.id)}
                                                onMouseLeave={() => setHoveredDriver(null)}
                                                className={`absolute cursor-pointer transition-all ${isLinchpin
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
                                    <p className="text-sm text-pink-100">
                                        Drivers with 2+ connections are highlighted in <span className="font-bold text-pink-300">bright pink</span>. These are the forces that,
                                        if they shift, will create the greatest ripple effects across the entire system.
                                        They are prime candidates for scenario matrix axes.
                                    </p>
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





