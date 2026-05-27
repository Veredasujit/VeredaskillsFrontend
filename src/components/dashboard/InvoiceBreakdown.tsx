"use client";
import React, { useEffect, useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/store";

interface InvoiceProps {
  totalAmount: number;
  userName?: string;
  userPhone?: string;
  date?: string;
  courseName?: string;
  isOpen?: boolean;
  onClose?: () => void;
  currency?: string;
  gstRate?: number;
  companyEmail?: string;
  companyWebsite?: string;
}

const InvoiceBreakdown: React.FC<InvoiceProps> = ({ 
  totalAmount,
  date = new Date().toLocaleDateString('en-IN'),
  courseName = "Mastery in Mobile App Development",
  isOpen = true,
  onClose = () => {},
  currency = "₹",
  gstRate = 18,
  companyEmail = "support@vereda.co.in",
  companyWebsite = "www.vereda.co.in",
}) => {
  const invoiceRef = useRef<HTMLDivElement>(null);
  
  const invoiceDetails = useMemo(() => {
    if(!totalAmount){
      console.error("No total amount found");
      return { base: "0.00", gstAmount: "0.00", halfGst: "0.00" };
    }
    if (totalAmount <= 0) {
      console.error("Invalid total amount");
      return { base: "0.00", gstAmount: "0.00", halfGst: "0.00" };
    }
    
    const base = (totalAmount / (1 + gstRate/100)).toFixed(2);
    const gstAmount = (totalAmount - Number(base)).toFixed(2);
    const halfGst = (Number(gstAmount) / 2).toFixed(2);
    
    return { base, gstAmount, halfGst };
  }, [totalAmount, gstRate]);

  const { base, gstAmount, halfGst } = invoiceDetails;

  const userData = useSelector((state: RootState) => state.auth.user);
  
  const safeUserData = {
    name: userData?.name || 'User',
    profileURL: userData?.profileURL || '',
    role: userData?.role || 'Student',
    phone: userData?.phone || '1234567890'
  };
  
  const userName = safeUserData.name;
  const userPhone = safeUserData.phone;

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const handleDownloadPDF = () => {
    handlePrint();
  };

  const handlePrint = () => {
  const printContent = invoiceRef.current;
  if (!printContent) return;

  // Create a copy of the content for printing
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Please allow popups for printing');
    return;
  }

  
  
  const companyName = 'Vereda Digital Learning';
  const companyAddress = 'Sinha Library road, Venture park, Patna Lodipur, Patna, Bihar 800001, India';

  const invoiceNumber = `INV-${Date.now().toString().slice(-6)}`;
  
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Invoice - ${courseName}</title>
        <meta charset="UTF-8">
        <style>
          @media print {
            @page {
              margin: 15mm;
              size: A4;
            }
            
            body {
              margin: 0;
              padding: 0;
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              color: #1f2937;
              line-height: 1.6;
              background: #ffffff;
            }
            
            .print-container {
              max-width: 210mm;
              margin: 0 auto;
              padding: 0;
            }
            
            /* Header Styles */
            .print-header {
              display: flex;
              justify-content: space-between;
              align-items: flex-start;
              margin-bottom: 30px;
              padding-bottom: 20px;
              border-bottom: 3px solid #2563eb;
            }
            
            .company-info {
              flex: 1;
            }
            
            .company-logo {
              height: 60px;
              margin-bottom: 10px;
            }
            
            .invoice-info {
              text-align: right;
              flex-shrink: 0;
            }
            
            .invoice-title {
              font-size: 28px;
              font-weight: 800;
              color: #1e40af;
              margin: 0 0 5px 0;
              text-transform: uppercase;
              letter-spacing: 1px;
            }
            
            .invoice-meta {
              font-size: 14px;
              color: #6b7280;
            }
            
            /* Section Styles */
            .print-section {
              margin-bottom: 25px;
              page-break-inside: avoid;
            }
            
            .section-title {
              font-size: 16px;
              font-weight: 700;
              color: #374151;
              margin-bottom: 15px;
              padding-bottom: 8px;
              border-bottom: 2px solid #e5e7eb;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }
            
            .section-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 20px;
            }
            
            .info-card {
              background: #f8fafc;
              padding: 16px;
              border-radius: 8px;
              border-left: 4px solid #2563eb;
            }
            
            .info-label {
              font-size: 12px;
              font-weight: 600;
              color: #6b7280;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              margin-bottom: 4px;
            }
            
            .info-value {
              font-size: 14px;
              font-weight: 600;
              color: #1f2937;
            }
            
            /* Table Styles */
            .invoice-table {
              width: 100%;
              border-collapse: collapse;
              margin: 20px 0;
            }
            
            .invoice-table th {
              background: #1e40af;
              color: white;
              padding: 12px 16px;
              text-align: left;
              font-weight: 600;
              font-size: 13px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }
            
            .invoice-table td {
              padding: 12px 16px;
              border-bottom: 1px solid #e5e7eb;
            }
            
            .invoice-table tr:nth-child(even) {
              background: #f8fafc;
            }
            
            .invoice-table tr:hover {
              background: #f1f5f9;
            }
            
            .amount-cell {
              text-align: right;
              font-weight: 600;
            }
            
            /* Total Section */
            .total-section {
              margin-top: 30px;
              background: linear-gradient(135deg, #1e40af, #3730a3);
              color: white;
              padding: 20px;
              border-radius: 12px;
              text-align: center;
            }
            
            .total-label {
              font-size: 16px;
              font-weight: 600;
              margin-bottom: 8px;
              opacity: 0.9;
            }
            
            .total-amount {
              font-size: 28px;
              font-weight: 800;
              margin: 0;
            }
            
            /* Status Styles */
            .print-status {
              background: linear-gradient(135deg, #10b981, #059669);
              color: white;
              padding: 15px;
              border-radius: 8px;
              text-align: center;
              margin: 25px 0;
              font-weight: 600;
              font-size: 16px;
            }
            
            /* Footer Styles */
            .print-footer {
              margin-top: 40px;
              padding-top: 20px;
              border-top: 2px solid #e5e7eb;
              text-align: center;
              color: #6b7280;
              font-size: 12px;
            }
            
            .footer-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 20px;
              margin-bottom: 15px;
            }
            
            .footer-section {
              text-align: center;
            }
            
            .footer-title {
              font-weight: 600;
              color: #374151;
              margin-bottom: 5px;
              font-size: 13px;
            }
            
            /* Utility Classes */
            .text-right {
              text-align: right;
            }
            
            .text-center {
              text-align: center;
            }
            
            .mb-2 {
              margin-bottom: 8px;
            }
            
            .mb-4 {
              margin-bottom: 16px;
            }
            
            /* Print Optimizations */
            * {
              -webkit-print-color-adjust: exact !important;
              color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            
            @page {
              @bottom-right {
                content: "Page " counter(page) " of " counter(pages);
                font-size: 10px;
                color: #6b7280;
              }
            }
          }
          
          /* Screen preview styles */
          @media screen {
            body {
              background: #f3f4f6;
              padding: 20px;
            }
            
            .print-container {
              background: white;
              padding: 30px;
              border-radius: 12px;
              box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            }
          }
        </style>
      </head>
      <body>
        <div class="print-container">
          <!-- Header -->
          <div class="print-header">
            <div class="company-info">
              <!-- Replace with your logo URL -->
              <img src="/logo.svg" alt="${companyName}" class="company-logo" onerror="this.style.display='none'">
              <div style="margin-left: ${true ? '0' : '10px'};">
                <h2 style="margin: 0; color: #1e40af; font-size: 24px; font-weight: 800;">${companyName}</h2>
                <p style="margin: 4px 0 0 0; color: #6b7280; font-size: 14px;">${companyAddress}</p>
                <p style="margin: 2px 0 0 0; color: #6b7280; font-size: 14px;">GSTIN: 07AABCU9603R1ZM</p>
              </div>
            </div>
            
            <div class="invoice-info">
              <h1 class="invoice-title">INVOICE</h1>
              <div class="invoice-meta">
                <div><strong>Invoice No:</strong> ${invoiceNumber}</div>
                <div><strong>Date:</strong> ${date}</div>
                
              </div>
            </div>
          </div>

          <!-- Bill To Section -->
          <div class="print-section">
            <div class="section-grid">
              <div class="info-card">
                <div class="section-title">Bill To</div>
                <div class="mb-4">
                  <div class="info-label">Student Name</div>
                  <div class="info-value">${userName}</div>
                </div>
                <div>
                  <div class="info-label">Phone Number</div>
                  <div class="info-value">${userPhone}</div>
                </div>
              </div>
              
              <div class="info-card">
                <div class="section-title">Course Information</div>
                <div class="mb-4">
                  <div class="info-label">Course Name</div>
                  <div class="info-value">${courseName}</div>
                </div>
                <div>
                  <div class="info-label">Enrollment Status</div>
                  <div class="info-value" style="color: #059669;">✓ Completed</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Invoice Breakdown -->
          <div class="print-section">
            <div class="section-title">Invoice Breakdown</div>
            <table class="invoice-table">
              <thead>
                <tr>
                  <th style="width: 50%;">Description</th>
                  <th style="width: 20%;">Rate</th>
                  <th style="width: 15%;">GST</th>
                  <th style="width: 15%;" class="text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>${courseName}</strong><br>
                    <span style="color: #6b7280; font-size: 12px;">Base course fee</span>
                  </td>
                  <td>${currency}${base}</td>
                  <td>${gstRate}%</td>
                  <td class="amount-cell">${currency}${base}</td>
                </tr>
                
                <!-- GST Breakdown -->
                <tr>
                  <td colspan="3" style="padding-left: 30px;">
                    <strong>GST Breakdown</strong>
                  </td>
                  <td class="amount-cell">${currency}${gstAmount}</td>
                </tr>
                
                <tr style="background: #f0f9ff;">
                  <td style="padding-left: 45px; font-size: 13px;">
                    CGST (${gstRate/2}%)
                  </td>
                  <td></td>
                  <td></td>
                  <td class="amount-cell">${currency}${halfGst}</td>
                </tr>
                
                <tr style="background: #f0f9ff;">
                  <td style="padding-left: 45px; font-size: 13px;">
                    SGST (${gstRate/2}%)
                  </td>
                  <td></td>
                  <td></td>
                  <td class="amount-cell">${currency}${halfGst}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Total Section -->
          <div class="total-section">
            <div class="total-label">Total Amount Payable</div>
            <div class="total-amount">${currency}${totalAmount?.toFixed(2)}</div>
            <div style="margin-top: 8px; font-size: 14px; opacity: 0.9;">
              ${(totalAmount?.toFixed(2) || '0.00')} INR
            </div>
          </div>

          <!-- Payment Status -->
          <div class="print-status">
            <span style="margin-right: 8px;">✓</span>
            Payment Successful - Thank You For Your Payment
          </div>

          <!-- Terms & Notes -->
          <div class="print-section">
            <div class="section-grid">
              <div class="info-card">
                <div class="section-title">Payment Terms</div>
                <ul style="margin: 0; padding-left: 16px; font-size: 12px; color: #6b7280;">
                  <li>Payment due within 7 days of invoice date</li>
                  <li>Make payment via bank transfer or UPI</li>
                  <li>Late payments subject to interest charges</li>
                </ul>
              </div>
              
              <div class="info-card">
                <div class="section-title">Notes</div>
                <ul style="margin: 0; padding-left: 16px; font-size: 12px; color: #6b7280;">
                  <li>This is a computer-generated invoice</li>
                  <li>No signature required</li>
                  <li>Valid without seal</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="print-footer">
            <div class="footer-grid">
              <div class="footer-section">
                <div class="footer-title">Contact Information</div>
                <div>📧 ${companyEmail}</div>
                <div>🌐 ${companyWebsite}</div>
                <div>📞 +91-9876543210</div>
              </div>
              
              
            </div>
            
            <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; font-style: italic;">
                Thank you for choosing ${companyName}. We appreciate your business and look forward to serving you!
              </p>
            </div>
            
            <div style="margin-top: 15px; font-size: 11px; color: #9ca3af;">
              This invoice is automatically generated by ${companyName} system. For any queries, please contact our support team.
            </div>
          </div>
        </div>
        
        <script>
          // Add page numbers and other dynamic content
          document.addEventListener('DOMContentLoaded', function() {
            // You can add any dynamic JavaScript here if needed
            console.log('Invoice loaded for printing');
          });
        </script>
      </body>
    </html>
  `);

  printWindow.document.close();
  
  // Wait for content to load then print
  setTimeout(() => {
    printWindow.focus();
    printWindow.print();
    printWindow.onafterprint = () => {
      setTimeout(() => {
        printWindow.close();
      }, 500);
    };
  }, 1000);
};

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Course Invoice',
          text: `Your invoice for ${courseName} - Amount: ${currency}${totalAmount}`,
        });
      } catch (error) {
        console.log('Sharing cancelled', error);
      }
    } else {
      const invoiceText = `Course: ${courseName}\nAmount: ${currency}${totalAmount}\nDate: ${date}\nStudent: ${userName}`;
      navigator.clipboard.writeText(invoiceText);
      alert("Invoice details copied to clipboard!");
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-blue-500/10 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn print:hidden"
        onClick={handleBackdropClick}
      >
        {/* Modal Container */}
        <div 
          ref={invoiceRef}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col animate-scaleIn invoice-modal"
        >
          
          {/* Header with Close Button */}
          <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200 bg-white sticky top-0 z-10 print:hidden">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-bold text-lg">{currency}</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-800">Payment Summary</h1>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full hover:bg-red-400 flex items-center justify-center transition-colors duration-200 text-red-500 hover:text-red-700 cursor-pointer"
              aria-label="Close invoice"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="overflow-y-auto flex-1 p-4 sm:p-6 md:p-8">
            
            {/* Invoice Meta */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-sm text-gray-500 mb-6 print:hidden">
              <span>Today Date: <span className="font-semibold text-gray-700">{date}</span></span>
            </div>

            {/* User Information Section */}
            <div className="bg-blue-50 rounded-xl p-6 mb-8 border border-blue-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                Student Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-600 block mb-1">Full Name</label>
                  <div className="flex items-center text-gray-800 font-medium">
                    <svg className="w-4 h-4 mr-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                    {userName}
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-600 block mb-1">Phone Number</label>
                  <div className="flex items-center text-gray-800 font-medium">
                    <svg className="w-4 h-4 mr-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    {userPhone}
                  </div>
                </div>
              </div>
            </div>

            {/* Course Information */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
                Course Details
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="text-gray-800 font-medium">{courseName}</div>
                <div className="text-sm text-gray-600 mt-1">Enrollment Completed</div>
              </div>
            </div>

            {/* Invoice Breakdown */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
              <h2 className="text-xl font-semibold text-center mb-6 text-gray-800">Invoice Summary</h2>

              <div className="space-y-4 text-gray-700">
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Base Course Price</span>
                  <span className="font-medium text-gray-800">{currency}{base}</span>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">GST @ {gstRate}%</span>
                    <span className="font-medium text-gray-800">{currency}{gstAmount}</span>
                  </div>

                  <div className="pl-4 text-sm text-gray-500 space-y-2 bg-gray-50 rounded-lg p-3">
                    <div className="flex justify-between">
                      <span>CGST @ {gstRate/2}%</span>
                      <span>{currency}{halfGst}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>SGST @ {gstRate/2}%</span>
                      <span>{currency}{halfGst}</span>
                    </div>
                  </div>
                </div>

                <hr className="my-4 border-gray-200" />

                <div className="flex justify-between items-center text-lg font-bold bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
                  <span className="text-gray-800">Total Payable Amount</span>
                  <span className="text-blue-700">{currency}{totalAmount?.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Payment Status */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-green-800 font-medium">Payment Successful</span>
                </div>
              </div>
            </div>

            {/* Footer Section */}
            <div className="text-center text-sm text-gray-500 border-t border-gray-100 pt-6">
              <p className="mb-2">Thank you for your enrollment!</p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-6 text-xs">
                <span className="flex items-center">
                  <span className="mr-1">📧</span>
                  {companyEmail}
                </span>
                <span className="hidden sm:inline">•</span>
                <span className="flex items-center">
                  <span className="mr-1">🌐</span>
                  {companyWebsite}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons - Sticky Footer */}
          <div className="border-t border-gray-200 bg-white p-4 sm:p-6 sticky bottom-0 z-10 print:hidden">
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <button 
                onClick={handleDownloadPDF}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium flex items-center justify-center flex-1 sm:flex-none"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Download PDF
              </button>
              <button 
                onClick={handlePrint}
                className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200 font-medium flex-1 sm:flex-none"
              >
                Print Invoice
              </button>
              
              <button 
                onClick={handleShare}
                className="px-6 py-3 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors duration-200 font-medium flex-1 sm:flex-none"
              >
                Share
              </button>
              <button 
                onClick={onClose}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium flex-1 sm:flex-none sm:hidden"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleIn {
          from { 
            opacity: 0;
            transform: scale(0.9);
          }
          to { 
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.2s ease-out;
        }
      `}</style>
    </>
  );
};

export default InvoiceBreakdown;