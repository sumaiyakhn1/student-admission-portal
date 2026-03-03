import React, { useState } from "react";
import { Download, FileText, Loader2 } from "lucide-react";
import jsPDF from "jspdf";
import toast from "react-hot-toast";

interface Props {
    student: any;
}

const ApplicationFormCard = ({ student }: Props) => {
    const [generating, setGenerating] = useState(false);

    const generatePDF = async () => {
        try {
            setGenerating(true);
            const doc = new jsPDF("p", "mm", "a4");

            const drawSection = (startY: number, isTemporary: boolean) => {
                // --- Header ---
                doc.setFont("times", "italic");
                doc.setFontSize(16);
                doc.text("Lingaya's Vidyapeeth, Faridabad-121002", 15, startY);

                doc.setFontSize(9);
                doc.setFont("times", "normal");
                if (isTemporary) {
                    doc.text("(Deemed to - be - University)", 92, startY);
                } else {
                    doc.text("(Deemed to - be - University, Under Section-3 of UGC Act-1956)", 15, startY + 4);
                    doc.text("Ph. 01292598200-205", 115, startY + 4);
                }

                doc.setFontSize(13);
                doc.setFont("times", "bold");
                if (isTemporary) {
                    doc.text("TEMPORARY STUDENT IDENTITY CARD", 15, startY + 5);
                    doc.setFontSize(8);
                    doc.setFont("times", "normal");
                    doc.text("(Ph. No. 0129-2598200 - 205)", 93, startY + 5);
                } else {
                    doc.text("Form for Permanent Student Identity card", 15, startY + 9);
                }

                // --- Photo Box ---
                const photoY = isTemporary ? startY - 2 : startY + 10;
                doc.rect(160, photoY, 35, 42);
                doc.setFontSize(9);
                doc.setFont("times", "normal");
                doc.text("PAST PHOTO", 166, photoY + 22);

                doc.setFontSize(10);
                let y = isTemporary ? startY + 12 : startY + 18;

                if (!isTemporary) {
                    doc.text("(Fill in Capital letter's only)", 15, y);
                    doc.setFontSize(9);
                    doc.text("Card No- .....................................", 120, y);
                    doc.text("(To be filled by the Office)", 120, y + 4);
                    doc.setFontSize(10);
                    y += 10;

                    doc.setFont("times", "bold");
                    doc.text("Course Name: - .......................................................................", 15, y);
                    doc.text(student?.course || "", 45, y - 1); // fill course
                    doc.setFont("times", "normal");
                    y += 8;
                }

                const addRow = (label: string, value: string, yPos: number, isHalf: boolean = false) => {
                    doc.text(`${label}`, 15, yPos);
                    doc.text(`:-`, 35, yPos);

                    const lineStartX = 40;
                    const lineEndX = isHalf ? 95 : 150;

                    doc.setDrawColor(180, 180, 180);
                    doc.line(lineStartX, yPos + 1, lineEndX, yPos + 1);
                    doc.setDrawColor(0, 0, 0);

                    if (value) {
                        doc.setFont("helvetica", "bold");
                        doc.text(value.toUpperCase(), lineStartX + 2, yPos - 1);
                        doc.setFont("times", "normal");
                    }
                };

                addRow("Name", student?.name || "", y); y += 8;
                addRow("Father Name", student?.fatherName || "", y); y += 8;
                addRow("Address", student?.address || "", y); y += 8;

                // Two columns row (Mobile & Course/DOB)
                doc.text("Mobile No", 15, y); doc.text(":-", 35, y);
                doc.setDrawColor(180, 180, 180); doc.line(40, y + 1, 75, y + 1); doc.setDrawColor(0, 0, 0);
                if (student?.phone) { doc.setFont("helvetica", "bold"); doc.text(student.phone, 42, y - 1); doc.setFont("times", "normal"); }

                doc.text("Date of Birth:-", 80, y);
                doc.setDrawColor(180, 180, 180); doc.line(105, y + 1, 130, y + 1); doc.setDrawColor(0, 0, 0);
                // Add DOB if available 

                doc.text("Course Name:-", 135, y);
                doc.setDrawColor(180, 180, 180); doc.line(160, y + 1, 195, y + 1); doc.setDrawColor(0, 0, 0);
                if (student?.course) { doc.setFont("helvetica", "bold"); doc.text(student.course.substring(0, 15), 162, y - 1); doc.setFont("times", "normal"); }
                y += 8;


                // Issue & Valid up to row
                doc.text("Date of issue", 15, y); doc.text(":-", 35, y);
                doc.setDrawColor(180, 180, 180); doc.line(40, y + 1, 75, y + 1); doc.setDrawColor(0, 0, 0);

                if (isTemporary) {
                    doc.text("Date of Expiry: - 30th Sept.", 80, y);
                    doc.text("Temp. Roll / Reg. No", 135, y);
                    doc.setDrawColor(180, 180, 180); doc.line(170, y + 1, 195, y + 1); doc.setDrawColor(0, 0, 0);
                } else {
                    doc.text("Valid up to: - June ______", 80, y);
                    doc.setFontSize(8); doc.text("(End of Course)", 121, y); doc.setFontSize(10);
                    doc.text("Blood group ______", 150, y);
                }
                y += 8;

                // Email / Roll No
                if (isTemporary) {
                    doc.text("Email id.:- ........................................... Aadhar No.:- ........................................", 15, y);
                    if (student?.email) { doc.setFont("helvetica", "bold"); doc.text(student.email, 35, y - 1); doc.setFont("times", "normal"); }
                } else {
                    doc.text("Email id.:- ...........................................", 15, y);
                    if (student?.email) { doc.setFont("helvetica", "bold"); doc.text(student.email, 35, y - 1); doc.setFont("times", "normal"); }

                    doc.text("Roll / Reg. No", 100, y);
                    doc.setDrawColor(180, 180, 180); doc.line(125, y + 1, 195, y + 1); doc.setDrawColor(0, 0, 0);
                    doc.setFontSize(9); doc.text("(To be filled by the Office)", 100, y + 4); doc.setFontSize(10);
                    y += 8;

                    doc.text("Aadhar No.:- :- ...........................................", 15, y);
                    doc.text("(Copy of Aadhar card is enclosed)", 90, y);
                }

                y += 20;

                // Signatures
                doc.text("..............................", 15, y);
                doc.text("Signature of Student", 15, y + 5);

                doc.text("..............................", 150, y);
                doc.text("Dy. Registrar (Acad)", 150, y + 5);

                if (isTemporary) {
                    y += 15;
                    doc.setFontSize(8);
                    doc.setFont("times", "bold");
                    const noteText = "Note: - Student must submit his / her Original Migration Certificate & other eligibility / pending document (if any) by 30th September of current academic session otherwise late fee of Rs. 500/- will be charged, (as per rule) and Collect his / her Permanent I-Card from Academic Section of the University / Vidyapeeth";
                    const splitText = doc.splitTextToSize(noteText, 180);
                    doc.text(splitText, 15, y);
                }
            };

            // Draw Permanent Section (Top)
            drawSection(20, false);

            // Draw thick divider line
            doc.setDrawColor(0, 0, 0);
            doc.setLineWidth(0.5);
            doc.line(15, 145, 195, 145);
            doc.line(15, 146, 195, 146);
            doc.setLineWidth(0.1);

            // Draw Temporary Section (Bottom)
            drawSection(160, true);

            // Final bounding box for entire page (optional, based on image edge)
            doc.setLineWidth(0.8);
            doc.rect(5, 5, 200, 287);

            doc.save(`ID_Card_Form_${student?.name || "Student"}.pdf`);
            toast.success("PDF Downloaded successfully!");
        } catch (err) {
            console.error(err);
            toast.error("Failed to generate PDF");
        } finally {
            setGenerating(false);
        }
    };

    return (
        <div className="relative pl-8 mb-6">
            <div className="absolute left-1 top-0 bottom-0 w-1 bg-gray-200" />

            <div className="relative bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group">

                {/* Connection Dot */}
                <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-5 h-5 bg-blue-500 rounded-full border-4 border-gray-100 z-10 shadow-sm" />

                <div className="p-4 sm:p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-colors hover:bg-gray-50/50">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500 hidden sm:flex">
                            <FileText size={20} />
                        </div>
                        <div>
                            <h3 className="text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
                                Download Application Form
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                                Get a PDF copy of your filled details for offline reference.
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={generatePDF}
                        disabled={generating}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold text-sm rounded-xl transition-all shadow-sm shadow-blue-200"
                    >
                        {generating ? (
                            <Loader2 size={16} className="animate-spin" />
                        ) : (
                            <Download size={16} />
                        )}
                        Download PDF
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ApplicationFormCard;
