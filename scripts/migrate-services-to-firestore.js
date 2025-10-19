import admin from 'firebase-admin';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize Firebase Admin
let app;
try {
    // Try to load service account key from file
    const serviceAccountPath = join(__dirname, '..', 'service-account-key.json');
    console.log('📄 Loading service account from file...');
    const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));

    app = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
    console.log('✅ Firebase Admin initialized with service account file');
} catch (error) {
    console.error('❌ Error initializing Firebase Admin:', error.message);
    console.log('\n💡 Make sure service-account-key.json exists in the project root');
    process.exit(1);
}

const db = admin.firestore();

// Hardcoded services data (from app/[locale]/services/page.js)
const servicesData = {
    en: [
        {
            slug: "strategic-sap-consulting",
            title: "Strategic SAP Consulting",
            subtitle: "Expert SAP Transformation Guidance",
            description: "Expert guidance for your SAP transformation journey with strategic planning and business process optimization.",
            heroDescription: "Expert guidance for your SAP transformation journey with strategic planning and business process optimization.",
            fullDescription: "Our Strategic SAP Consulting services provide comprehensive roadmap development, business process analysis, and change management support to ensure successful SAP implementations.",
            iconType: "icon",
            iconName: "FaChartLine",
            benefits: [
                "Reduced implementation costs by 30%",
                "Improved business process efficiency",
                "Strategic roadmap for digital transformation",
                "Risk mitigation and compliance assurance"
            ],
            features: [
                { title: "Business Process Analysis", description: "Comprehensive analysis of your current business processes", icon: "FaChartLine" },
                { title: "Strategic Roadmap Development", description: "Create a detailed implementation roadmap", icon: "FaRocket" },
                { title: "Change Management", description: "Guide your organization through digital transformation", icon: "FaUsers" },
                { title: "Risk Assessment", description: "Identify and mitigate potential risks", icon: "FaShieldAlt" }
            ],
            implementation: [
                "Initial business assessment and requirement gathering",
                "Current state analysis and gap identification",
                "Future state design and roadmap creation",
                "Implementation planning and resource allocation"
            ],
            industries: ["Manufacturing", "Retail", "Healthcare", "Financial Services"],
            roi: "Achieve 30% faster SAP implementation with strategic planning",
            status: "published",
            category: "sap-services",
            order: 1
        },
        {
            slug: "sap-erp-implementation",
            title: "SAP ERP Implementation & Enhancement",
            subtitle: "Complete ERP Implementation Services",
            description: "Complete SAP ERP implementation and enhancement services tailored to your business needs.",
            heroDescription: "Complete SAP ERP implementation and enhancement services tailored to your business needs.",
            fullDescription: "Our SAP ERP Implementation services cover end-to-end deployment of SAP systems, including all major modules like FI/CO, MM, SD, PP, and HCM.",
            iconType: "icon",
            iconName: "FaDatabase",
            benefits: [
                "Streamlined business processes across all departments",
                "Real-time visibility into business operations",
                "Improved data accuracy and reporting capabilities"
            ],
            features: [
                { title: "Full System Implementation", description: "End-to-end SAP ERP implementation", icon: "FaDatabase" },
                { title: "Data Integration", description: "Seamless integration of existing data sources", icon: "FaCogs" },
                { title: "Process Optimization", description: "Optimize business processes for efficiency", icon: "FaChartLine" }
            ],
            implementation: [
                "Requirements gathering and analysis",
                "System configuration and customization",
                "Data migration and testing",
                "User training and go-live support"
            ],
            industries: ["Manufacturing", "Distribution", "Services"],
            roi: "Improve operational efficiency by 40%",
            status: "published",
            category: "sap-services",
            order: 2
        },
        {
            slug: "sap-technical-services",
            title: "SAP Technical Services",
            subtitle: "Expert Technical Support",
            description: "Comprehensive technical services for SAP systems maintenance, optimization, and troubleshooting.",
            heroDescription: "Comprehensive technical services for SAP systems maintenance, optimization, and troubleshooting.",
            fullDescription: "Our technical team provides expert support for all your SAP technical needs, from system maintenance to performance optimization.",
            iconType: "icon",
            iconName: "FaCogs",
            benefits: [
                "Minimized system downtime",
                "Optimized system performance",
                "Proactive issue resolution"
            ],
            features: [
                { title: "System Maintenance", description: "Regular system health checks", icon: "FaCogs" },
                { title: "Performance Optimization", description: "Improve system performance", icon: "FaRocket" },
                { title: "Troubleshooting", description: "Quick issue resolution", icon: "FaLifeRing" }
            ],
            implementation: [
                "System assessment",
                "Performance analysis",
                "Optimization implementation",
                "Monitoring and support"
            ],
            industries: ["All Industries"],
            roi: "Reduce downtime by 60%",
            status: "published",
            category: "sap-services",
            order: 3
        },
        {
            slug: "sap-cloud-solutions",
            title: "SAP Cloud Solutions",
            subtitle: "Cloud Migration & Management",
            description: "Seamless migration to SAP Cloud and ongoing cloud infrastructure management.",
            heroDescription: "Seamless migration to SAP Cloud and ongoing cloud infrastructure management.",
            fullDescription: "Move your SAP systems to the cloud with our expert guidance and ongoing management services.",
            iconType: "icon",
            iconName: "FaCloud",
            benefits: [
                "Reduced infrastructure costs",
                "Improved scalability and flexibility",
                "Enhanced security and compliance"
            ],
            features: [
                { title: "Cloud Migration", description: "Smooth transition to cloud", icon: "FaCloud" },
                { title: "Hybrid Solutions", description: "Best of both worlds", icon: "FaServer" },
                { title: "Cloud Optimization", description: "Maximize cloud benefits", icon: "FaChartLine" }
            ],
            implementation: [
                "Cloud readiness assessment",
                "Migration planning",
                "Data migration",
                "Post-migration optimization"
            ],
            industries: ["Technology", "Finance", "Healthcare"],
            roi: "Save 35% on infrastructure costs",
            status: "published",
            category: "sap-services",
            order: 4
        },
        {
            slug: "sap-analytics-intelligence",
            title: "SAP Analytics & Business Intelligence",
            subtitle: "Data-Driven Insights",
            description: "Transform your data into actionable insights with SAP Analytics and BI solutions.",
            heroDescription: "Transform your data into actionable insights with SAP Analytics and BI solutions.",
            fullDescription: "Leverage the power of SAP Analytics Cloud and other BI tools to make informed business decisions.",
            iconType: "icon",
            iconName: "FaChartArea",
            benefits: [
                "Better decision-making with real-time insights",
                "Improved forecasting accuracy",
                "Enhanced data visualization"
            ],
            features: [
                { title: "Business Intelligence", description: "Comprehensive BI solutions", icon: "FaChartArea" },
                { title: "Data Visualization", description: "Interactive dashboards", icon: "FaChartPie" },
                { title: "Predictive Analytics", description: "Forecast future trends", icon: "FaChartLine" }
            ],
            implementation: [
                "Data source integration",
                "Dashboard design",
                "Report development",
                "User training"
            ],
            industries: ["Retail", "Manufacturing", "Finance"],
            roi: "Improve decision-making speed by 50%",
            status: "published",
            category: "sap-services",
            order: 5
        },
        {
            slug: "sap-security-compliance",
            title: "SAP Security & Compliance",
            subtitle: "Protect Your SAP Environment",
            description: "Comprehensive security and compliance services for your SAP landscape.",
            heroDescription: "Comprehensive security and compliance services for your SAP landscape.",
            fullDescription: "Ensure your SAP systems are secure and compliant with industry regulations.",
            iconType: "icon",
            iconName: "FaShieldAlt",
            benefits: [
                "Enhanced system security",
                "Regulatory compliance assurance",
                "Risk reduction"
            ],
            features: [
                { title: "Access Management", description: "Control user access", icon: "FaLock" },
                { title: "Compliance Auditing", description: "Regular compliance checks", icon: "FaClipboardCheck" },
                { title: "Risk Assessment", description: "Identify security risks", icon: "FaShieldAlt" }
            ],
            implementation: [
                "Security assessment",
                "Policy implementation",
                "Compliance monitoring",
                "Ongoing support"
            ],
            industries: ["Finance", "Healthcare", "Government"],
            roi: "Reduce security incidents by 70%",
            status: "published",
            category: "sap-services",
            order: 6
        },
        {
            slug: "ongoing-support-maintenance",
            title: "Ongoing Support & Maintenance",
            subtitle: "24/7 SAP Support",
            description: "Continuous support and maintenance services to keep your SAP systems running smoothly.",
            heroDescription: "Continuous support and maintenance services to keep your SAP systems running smoothly.",
            fullDescription: "Our support team is available 24/7 to assist with any SAP-related issues.",
            iconType: "icon",
            iconName: "FaLifeRing",
            benefits: [
                "24/7 support availability",
                "Quick issue resolution",
                "Proactive system monitoring"
            ],
            features: [
                { title: "Help Desk", description: "24/7 support access", icon: "FaHeadset" },
                { title: "Preventive Maintenance", description: "Regular system checks", icon: "FaTools" },
                { title: "System Monitoring", description: "Continuous monitoring", icon: "FaDesktop" }
            ],
            implementation: [
                "Support setup",
                "Ticket system configuration",
                "Team training",
                "Ongoing support delivery"
            ],
            industries: ["All Industries"],
            roi: "Maximize system uptime to 99.9%",
            status: "published",
            category: "sap-services",
            order: 7
        }
    ]
};

async function migrate() {
    console.log('🚀 Starting services migration to Firestore...');

    try {
        let totalCount = 0;

        for (const [locale, services] of Object.entries(servicesData)) {
            console.log(`\n📝 Migrating ${services.length} services for locale: ${locale}`);

            for (const service of services) {
                const serviceId = service.slug;
                const serviceData = {
                    ...service,
                    locale,
                    deleted: false,
                    createdAt: admin.firestore.Timestamp.now(),
                    updatedAt: admin.firestore.Timestamp.now(),
                    modifiedBy: 'migration-script',
                    version: 1
                };

                await db.collection('services').doc(serviceId).set(serviceData);
                totalCount++;
                console.log(`   ✓ Migrated: ${service.title}`);
            }
        }

        console.log(`\n✅ Migration completed successfully!`);
        console.log(`📊 Migrated ${totalCount} services to Firestore`);
        console.log(`🔍 You can now view your services in Firebase Console`);
        console.log(`✨ Migration script finished!`);

    } catch (error) {
        console.error('❌ Migration failed:', error);
        console.error('Error details:', error.message);
        process.exit(1);
    }
}

// Run migration
migrate().then(() => process.exit(0));

