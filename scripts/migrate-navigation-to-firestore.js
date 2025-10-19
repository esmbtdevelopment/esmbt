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

// Navigation data structure (from components/layout/Navbar.js)
const navigationData = {
    en: [
        {
            id: "corporate",
            type: "dropdown",
            label: "Corporate",
            labelKey: "navigation.corporate",
            href: null,
            icon: "FaBuilding",
            status: "published",
            section: "main",
            order: 1,
            children: [
                {
                    id: "corporate-about",
                    label: "About Us",
                    labelKey: "navigation.about",
                    description: "Learn about our company",
                    descriptionKey: "navigation.dropdown.corporate.aboutDescription",
                    icon: "FaBuilding",
                    href: "/corporate/about-us",
                    order: 1
                },
                {
                    id: "corporate-team",
                    label: "Our Team",
                    labelKey: "navigation.team",
                    description: "Meet our experts",
                    descriptionKey: "navigation.dropdown.corporate.teamDescription",
                    icon: "FaUsers",
                    href: "/corporate/our-team",
                    order: 2
                },
                {
                    id: "corporate-vision",
                    label: "Vision & Mission",
                    labelKey: "navigation.vision",
                    description: "Our goals and values",
                    descriptionKey: "navigation.dropdown.corporate.visionDescription",
                    icon: "FaHandshake",
                    href: "/corporate/vision-and-mission",
                    order: 3
                }
            ]
        },
        {
            id: "products",
            type: "dropdown",
            label: "Products",
            labelKey: "navigation.products",
            href: null,
            icon: "FaShoppingCart",
            status: "published",
            section: "main",
            order: 2,
            children: [
                {
                    id: "products-einvoice",
                    label: "E-Invoice Solutions",
                    labelKey: "navigation.eInvoiceSolutions",
                    description: "Digital invoice management",
                    descriptionKey: "navigation.dropdown.products.eInvoiceDescription",
                    icon: "FaFileInvoice",
                    href: "/products/e-invoice",
                    order: 1
                },
                {
                    id: "products-ecommerce",
                    label: "E-Commerce Platform",
                    labelKey: "navigation.eCommercePlatform",
                    description: "Complete online store solution",
                    descriptionKey: "navigation.dropdown.products.eCommerceDescription",
                    icon: "FaShoppingCart",
                    href: "/products/e-commerce",
                    order: 2
                },
                {
                    id: "products-digital",
                    label: "Digital Transformation",
                    labelKey: "navigation.digitalTransformation",
                    description: "Transform your business digitally",
                    descriptionKey: "navigation.dropdown.products.digitalTransformationDescription",
                    icon: "FaRocket",
                    href: "/products",
                    order: 3
                },
                {
                    id: "products-all",
                    label: "View All Products",
                    labelKey: "navigation.viewAllProducts",
                    description: "See our complete product catalog",
                    descriptionKey: "navigation.dropdown.products.viewAllDescription",
                    icon: "FaThLarge",
                    href: "/products",
                    order: 4,
                    highlight: true
                }
            ]
        },
        {
            id: "services",
            type: "dropdown",
            label: "Services",
            labelKey: "navigation.services",
            href: null,
            icon: "FaCogs",
            status: "published",
            section: "main",
            order: 3,
            children: [
                {
                    id: "services-consulting",
                    label: "Strategic SAP Consulting",
                    labelKey: "navigation.strategicConsulting",
                    description: "Expert SAP transformation guidance",
                    descriptionKey: "navigation.dropdown.services.strategicConsultingDescription",
                    icon: "FaChartLine",
                    href: "/services/strategic-sap-consulting",
                    order: 1
                },
                {
                    id: "services-erp",
                    label: "SAP ERP Implementation",
                    labelKey: "navigation.erpImplementation",
                    description: "Complete ERP deployment services",
                    descriptionKey: "navigation.dropdown.services.erpImplementationDescription",
                    icon: "FaDatabase",
                    href: "/services/sap-erp-implementation",
                    order: 2
                },
                {
                    id: "services-cloud",
                    label: "SAP Cloud Solutions",
                    labelKey: "navigation.cloudSolutions",
                    description: "Cloud migration and management",
                    descriptionKey: "navigation.dropdown.services.cloudSolutionsDescription",
                    icon: "FaCloud",
                    href: "/services/sap-cloud-solutions",
                    order: 3
                },
                {
                    id: "services-all",
                    label: "View All Services",
                    labelKey: "navigation.viewAllServices",
                    description: "Explore our complete service offerings",
                    descriptionKey: "navigation.dropdown.services.viewAllDescription",
                    icon: "FaThLarge",
                    href: "/services",
                    order: 4,
                    highlight: true
                }
            ]
        },
        {
            id: "contact",
            type: "link",
            label: "Contact",
            labelKey: "navigation.contact",
            href: "/contact",
            icon: "FaEnvelope",
            status: "published",
            section: "main",
            order: 4,
            children: []
        }
    ],
    tr: [
        {
            id: "corporate-tr",
            type: "dropdown",
            label: "Kurumsal",
            labelKey: "navigation.corporate",
            href: null,
            icon: "FaBuilding",
            status: "published",
            section: "main",
            order: 1,
            children: [
                {
                    id: "corporate-about-tr",
                    label: "Hakkımızda",
                    labelKey: "navigation.about",
                    description: "Şirketimiz hakkında bilgi edinin",
                    descriptionKey: "navigation.dropdown.corporate.aboutDescription",
                    icon: "FaBuilding",
                    href: "/corporate/about-us",
                    order: 1
                },
                {
                    id: "corporate-team-tr",
                    label: "Ekibimiz",
                    labelKey: "navigation.team",
                    description: "Uzmanlarımızla tanışın",
                    descriptionKey: "navigation.dropdown.corporate.teamDescription",
                    icon: "FaUsers",
                    href: "/corporate/our-team",
                    order: 2
                },
                {
                    id: "corporate-vision-tr",
                    label: "Vizyon & Misyon",
                    labelKey: "navigation.vision",
                    description: "Hedeflerimiz ve değerlerimiz",
                    descriptionKey: "navigation.dropdown.corporate.visionDescription",
                    icon: "FaHandshake",
                    href: "/corporate/vision-and-mission",
                    order: 3
                }
            ]
        },
        {
            id: "products-tr",
            type: "dropdown",
            label: "Ürünler",
            labelKey: "navigation.products",
            href: null,
            icon: "FaShoppingCart",
            status: "published",
            section: "main",
            order: 2,
            children: [
                {
                    id: "products-einvoice-tr",
                    label: "E-Fatura Çözümleri",
                    labelKey: "navigation.eInvoiceSolutions",
                    description: "Dijital fatura yönetimi",
                    descriptionKey: "navigation.dropdown.products.eInvoiceDescription",
                    icon: "FaFileInvoice",
                    href: "/products/e-invoice",
                    order: 1
                },
                {
                    id: "products-ecommerce-tr",
                    label: "E-Ticaret Platformu",
                    labelKey: "navigation.eCommercePlatform",
                    description: "Tam online mağaza çözümü",
                    descriptionKey: "navigation.dropdown.products.eCommerceDescription",
                    icon: "FaShoppingCart",
                    href: "/products/e-commerce",
                    order: 2
                },
                {
                    id: "products-digital-tr",
                    label: "Dijital Dönüşüm",
                    labelKey: "navigation.digitalTransformation",
                    description: "İşletmenizi dijital olarak dönüştürün",
                    descriptionKey: "navigation.dropdown.products.digitalTransformationDescription",
                    icon: "FaRocket",
                    href: "/products",
                    order: 3
                },
                {
                    id: "products-all-tr",
                    label: "Tüm Ürünler",
                    labelKey: "navigation.viewAllProducts",
                    description: "Tüm ürün kataloğumuzu görün",
                    descriptionKey: "navigation.dropdown.products.viewAllDescription",
                    icon: "FaThLarge",
                    href: "/products",
                    order: 4,
                    highlight: true
                }
            ]
        },
        {
            id: "services-tr",
            type: "dropdown",
            label: "Hizmetler",
            labelKey: "navigation.services",
            href: null,
            icon: "FaCogs",
            status: "published",
            section: "main",
            order: 3,
            children: [
                {
                    id: "services-consulting-tr",
                    label: "Stratejik SAP Danışmanlığı",
                    labelKey: "navigation.strategicConsulting",
                    description: "Uzman SAP dönüşüm rehberliği",
                    descriptionKey: "navigation.dropdown.services.strategicConsultingDescription",
                    icon: "FaChartLine",
                    href: "/services/strategic-sap-consulting",
                    order: 1
                },
                {
                    id: "services-erp-tr",
                    label: "SAP ERP Kurulumu",
                    labelKey: "navigation.erpImplementation",
                    description: "Tam ERP kurulum hizmetleri",
                    descriptionKey: "navigation.dropdown.services.erpImplementationDescription",
                    icon: "FaDatabase",
                    href: "/services/sap-erp-implementation",
                    order: 2
                },
                {
                    id: "services-cloud-tr",
                    label: "SAP Bulut Çözümleri",
                    labelKey: "navigation.cloudSolutions",
                    description: "Bulut taşıma ve yönetim",
                    descriptionKey: "navigation.dropdown.services.cloudSolutionsDescription",
                    icon: "FaCloud",
                    href: "/services/sap-cloud-solutions",
                    order: 3
                },
                {
                    id: "services-all-tr",
                    label: "Tüm Hizmetler",
                    labelKey: "navigation.viewAllServices",
                    description: "Tüm hizmet tekliflerimizi keşfedin",
                    descriptionKey: "navigation.dropdown.services.viewAllDescription",
                    icon: "FaThLarge",
                    href: "/services",
                    order: 4,
                    highlight: true
                }
            ]
        },
        {
            id: "contact-tr",
            type: "link",
            label: "İletişim",
            labelKey: "navigation.contact",
            href: "/contact",
            icon: "FaEnvelope",
            status: "published",
            section: "main",
            order: 4,
            children: []
        }
    ]
};

async function migrate() {
    console.log('🚀 Starting navigation migration to Firestore...');

    try {
        let totalCount = 0;

        for (const [locale, navItems] of Object.entries(navigationData)) {
            console.log(`\n📝 Migrating ${navItems.length} navigation items for locale: ${locale}`);

            for (const navItem of navItems) {
                const navData = {
                    ...navItem,
                    locale,
                    deleted: false,
                    createdAt: admin.firestore.Timestamp.now(),
                    updatedAt: admin.firestore.Timestamp.now(),
                    modifiedBy: 'migration-script'
                };

                // Use a unique ID that includes locale
                const navId = `${navItem.id}-${locale}`;
                await db.collection('navigation').doc(navId).set(navData);
                totalCount++;
                console.log(`   ✓ Migrated: ${navItem.label} (${navItem.children?.length || 0} children)`);
            }
        }

        console.log(`\n✅ Migration completed successfully!`);
        console.log(`📊 Migrated ${totalCount} navigation items to Firestore`);
        console.log(`🔍 You can now view your navigation in Firebase Console`);
        console.log(`✨ Migration script finished!`);

    } catch (error) {
        console.error('❌ Migration failed:', error);
        console.error('Error details:', error.message);
        process.exit(1);
    }
}

// Run migration
migrate().then(() => process.exit(0));

