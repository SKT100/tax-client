const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, Header, Footer, AlignmentType, HeadingLevel, BorderStyle, WidthType, ShadingType, VerticalAlign, PageNumber, PageBreak } = require('docx');
const fs = require('fs');
const path = require('path');

const doc = new Document({
    sections: [{
        properties: {},
        children: [
            // COVER PAGE
            new Paragraph({
                text: "",
                spacing: { before: 1800 }
            }),
            new Paragraph({
                children: [
                    new TextRun({ text: "matrixtaxx.com", size: 72, bold: true, color: "FFFFFF" })
                ],
                alignment: AlignmentType.CENTER,
                shading: { type: ShadingType.CLEAR, fill: "1B2A4A" }
            }),
            new Paragraph({
                children: [
                    new TextRun({ text: "SEO / GEO / AEO Audit Report", size: 36, color: "93C5FD" })
                ],
                alignment: AlignmentType.CENTER,
                shading: { type: ShadingType.CLEAR, fill: "1B2A4A" }
            }),
            new Paragraph({
                children: [
                    new TextRun({ text: "FULL AUDIT", size: 22, color: "FFFFFF" })
                ],
                alignment: AlignmentType.CENTER,
                spacing: { after: 400 },
                shading: { type: ShadingType.CLEAR, fill: "1B2A4A" }
            }),
            new Table({
                width: { size: 100, type: WidthType.PERCENTAGE },
                borders: {
                    top: { style: BorderStyle.NONE },
                    bottom: { style: BorderStyle.NONE },
                    left: { style: BorderStyle.NONE },
                    right: { style: BorderStyle.NONE },
                    insideHorizontal: { style: BorderStyle.NONE },
                    insideVertical: { style: BorderStyle.NONE }
                },
                rows: [
                    new TableRow({
                        children: [
                            new TableCell({
                                shading: { fill: "D97706" }, // Amber
                                margins: { top: 400, bottom: 400 },
                                children: [
                                    new Paragraph({ text: "SEO", alignment: AlignmentType.CENTER, style: "Heading3" }),
                                    new Paragraph({ text: "5/10", alignment: AlignmentType.CENTER, style: "Heading1" }),
                                    new Paragraph({ text: "Needs Work", alignment: AlignmentType.CENTER })
                                ]
                            }),
                            new TableCell({
                                shading: { fill: "D97706" }, // Amber
                                margins: { top: 400, bottom: 400 },
                                children: [
                                    new Paragraph({ text: "GEO", alignment: AlignmentType.CENTER, style: "Heading3" }),
                                    new Paragraph({ text: "5/10", alignment: AlignmentType.CENTER, style: "Heading1" }),
                                    new Paragraph({ text: "Needs Work", alignment: AlignmentType.CENTER })
                                ]
                            }),
                            new TableCell({
                                shading: { fill: "DC2626" }, // Red
                                margins: { top: 400, bottom: 400 },
                                children: [
                                    new Paragraph({ text: "AEO", alignment: AlignmentType.CENTER, style: "Heading3" }),
                                    new Paragraph({ text: "3/10", alignment: AlignmentType.CENTER, style: "Heading1" }),
                                    new Paragraph({ text: "Needs Attention", alignment: AlignmentType.CENTER })
                                ]
                            })
                        ]
                    })
                ]
            }),
            new Paragraph({
                text: "Audit date: 2026-09-09\nClaude Skill and Plugin by Alex Labat",
                alignment: AlignmentType.CENTER,
                spacing: { before: 1800 },
                shading: { type: ShadingType.CLEAR, fill: "1B2A4A" },
                style: "Normal"
            }),
            new PageBreak(),
            
            // EXECUTIVE SUMMARY
            new Paragraph({ text: "Executive Summary", heading: HeadingLevel.HEADING_1 }),
            new Table({
                width: { size: 100, type: WidthType.PERCENTAGE },
                rows: [
                    new TableRow({
                        children: [
                            new TableCell({
                                shading: { fill: "EFF6FF" },
                                children: [
                                    new Paragraph({
                                        text: "Matrix Tax Solutions has a well-structured foundational setup including robust local schema and basic meta tags. However, the reliance on a pure Client-Side Rendering (CSR) React architecture means non-JS crawlers see an empty page, drastically hurting its SEO, GEO, and AEO potentials. Fixing the rendering strategy (via SSR or SSG) and addressing dynamic metadata will unlock significant visibility.",
                                        style: "Normal"
                                    })
                                ]
                            })
                        ]
                    })
                ]
            }),
            new Paragraph({ text: "", spacing: { after: 200 } }),
            new Table({
                width: { size: 100, type: WidthType.PERCENTAGE },
                rows: [
                    new TableRow({
                        children: [
                            new TableCell({ children: [new Paragraph("Dimension")] }),
                            new TableCell({ children: [new Paragraph("Score")] }),
                            new TableCell({ children: [new Paragraph("Status")] }),
                            new TableCell({ children: [new Paragraph("Key Takeaway")] })
                        ]
                    }),
                    new TableRow({
                        children: [
                            new TableCell({ children: [new Paragraph("SEO")] }),
                            new TableCell({ children: [new Paragraph("5/10")] }),
                            new TableCell({ shading: { fill: "D97706" }, children: [new Paragraph("Needs Work")] }),
                            new TableCell({ children: [new Paragraph("Static SPA shell blocks crawlers; canonical URL mismatch.")] })
                        ]
                    }),
                    new TableRow({
                        children: [
                            new TableCell({ children: [new Paragraph("GEO")] }),
                            new TableCell({ children: [new Paragraph("5/10")] }),
                            new TableCell({ shading: { fill: "D97706" }, children: [new Paragraph("Needs Work")] }),
                            new TableCell({ children: [new Paragraph("E-E-A-T foundations in schema, but invisible content layer.")] })
                        ]
                    }),
                    new TableRow({
                        children: [
                            new TableCell({ children: [new Paragraph("AEO")] }),
                            new TableCell({ children: [new Paragraph("3/10")] }),
                            new TableCell({ shading: { fill: "DC2626" }, children: [new Paragraph("Needs Attention")] }),
                            new TableCell({ children: [new Paragraph("Missing FAQ schema, semantic HTML structure for voice.")] })
                        ]
                    })
                ]
            }),

            // PAGES AUDITED
            new Paragraph({ text: "Pages Audited", heading: HeadingLevel.HEADING_1 }),
            new Table({
                width: { size: 100, type: WidthType.PERCENTAGE },
                rows: [
                    new TableRow({ children: [new TableCell({ children: [new Paragraph("URL")] }), new TableCell({ children: [new Paragraph("Page Type")] }), new TableCell({ children: [new Paragraph("Notes")] })] }),
                    new TableRow({ children: [new TableCell({ children: [new Paragraph("https://matrixtaxx.com")] }), new TableCell({ children: [new Paragraph("Homepage")] }), new TableCell({ children: [new Paragraph("JS rendered; static shell only")] })] }),
                    new TableRow({ children: [new TableCell({ children: [new Paragraph("/schedule")] }), new TableCell({ children: [new Paragraph("Booking")] }), new TableCell({ children: [new Paragraph("Same metadata as homepage")] })] }),
                    new TableRow({ children: [new TableCell({ children: [new Paragraph("/compliance")] }), new TableCell({ children: [new Paragraph("Due Dates")] }), new TableCell({ children: [new Paragraph("Same metadata as homepage")] })] }),
                    new TableRow({ children: [new TableCell({ children: [new Paragraph("/terms")] }), new TableCell({ children: [new Paragraph("Legal")] }), new TableCell({ children: [new Paragraph("Noindex recommended but missing")] })] }),
                    new TableRow({ children: [new TableCell({ children: [new Paragraph("/privacy")] }), new TableCell({ children: [new Paragraph("Legal")] }), new TableCell({ children: [new Paragraph("Noindex recommended but missing")] })] }),
                    new TableRow({ children: [new TableCell({ children: [new Paragraph("/disclaimer")] }), new TableCell({ children: [new Paragraph("Legal")] }), new TableCell({ children: [new Paragraph("Noindex recommended but missing")] })] }),
                ]
            }),

            // PRIORITY RECOMMENDATIONS
            new Paragraph({ text: "Priority Recommendations", heading: HeadingLevel.HEADING_1 }),
            new Table({
                width: { size: 100, type: WidthType.PERCENTAGE },
                rows: [
                    new TableRow({ children: [new TableCell({ children: [new Paragraph("Priority")] }), new TableCell({ children: [new Paragraph("Issue")] }), new TableCell({ children: [new Paragraph("Dimension")] }), new TableCell({ children: [new Paragraph("Effort")] }), new TableCell({ children: [new Paragraph("Impact")] })] }),
                    new TableRow({ children: [new TableCell({ shading: { fill: "DC2626" }, children: [new Paragraph({text:"Critical", color:"FFFFFF"})] }), new TableCell({ children: [new Paragraph("Implement SSR/SSG (e.g., Vite SSR or transition to Next.js) for crawlable content.")] }), new TableCell({ children: [new Paragraph("SEO")] }), new TableCell({ children: [new Paragraph("High")] }), new TableCell({ children: [new Paragraph("High")] })] }),
                    new TableRow({ children: [new TableCell({ shading: { fill: "EA580C" }, children: [new Paragraph({text:"High", color:"FFFFFF"})] }), new TableCell({ children: [new Paragraph("Fix Canonical URL mismatch (matrixtaxsolutions.com vs matrixtaxx.com).")] }), new TableCell({ children: [new Paragraph("SEO")] }), new TableCell({ children: [new Paragraph("Low")] }), new TableCell({ children: [new Paragraph("High")] })] }),
                    new TableRow({ children: [new TableCell({ shading: { fill: "D97706" }, children: [new Paragraph({text:"Medium", color:"FFFFFF"})] }), new TableCell({ children: [new Paragraph("Implement dynamic `<meta>` tags per page (using React Helmet).")] }), new TableCell({ children: [new Paragraph("GEO")] }), new TableCell({ children: [new Paragraph("Medium")] }), new TableCell({ children: [new Paragraph("Medium")] })] }),
                    new TableRow({ children: [new TableCell({ shading: { fill: "16A34A" }, children: [new Paragraph({text:"Quick Win", color:"FFFFFF"})] }), new TableCell({ children: [new Paragraph("Add FAQ and HowTo JSON-LD schema for Services and Compliance pages.")] }), new TableCell({ children: [new Paragraph("AEO")] }), new TableCell({ children: [new Paragraph("Low")] }), new TableCell({ children: [new Paragraph("High")] })] })
                ]
            }),
            
            // WHAT'S WORKING WELL
            new Paragraph({ text: "What's Working Well", heading: HeadingLevel.HEADING_1 }),
            new Table({
                width: { size: 100, type: WidthType.PERCENTAGE },
                rows: [
                    new TableRow({
                        children: [
                            new TableCell({
                                shading: { fill: "F0FDF4" },
                                children: [
                                    new Paragraph("• LocalBusiness JSON-LD schema is perfectly formatted with correct NAP data and GeoCoordinates.\n• The sitemap.xml is clean and prioritizes pages effectively.\n• Clean URL routing is set up in React without hashed URLs.")
                                ]
                            })
                        ]
                    })
                ]
            })
        ]
    }]
});

Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync(path.join(__dirname, 'seo-audit-matrixtaxx-com-2026-09-09.docx'), buffer);
    console.log('DOCX written to ' + path.join(__dirname, 'seo-audit-matrixtaxx-com-2026-09-09.docx'));
});
