import { useRef, useState } from 'react';
import { Link, Printer, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ReceiptItem {
  id: number;
  line1: string;
  line2: string;
  line3: string;
  qty: string;
  qtyUnit: string;
  rate: string;
  amount: string;
}

interface ReceiptData {
  addressLine1: string;
  addressLine2: string;
  billType: string;
  diningType: string;
  tokenNo: string;
  orderNo: string;
  dateTime: string;
  waiter: string;
  user: string;
  table: string;
  items: ReceiptItem[];
  noOfItems: string;
  totalQty: string;
  totalAmount: string;
  remarks: string;
  printDate: string;
  printTime: string;
  printTimeAmPm: string;
  logoMode: 'text' | 'image';
  logoText: string;
  logoImageUrl: string | null;
  logoFontFamily: string;
  logoFontSize: number;
  logoFontWeight: '400' | '500' | '700' | '800' | '900';
}

const defaultItem: ReceiptItem = {
  id: Date.now(),
  line1: '',
  line2: '',
  line3: '',
  qty: '',
  qtyUnit: '',
  rate: '',
  amount: ''
};

const App = () => {
  const printRef = useRef<HTMLDivElement>(null);

  const [receipt, setReceipt] = useState<ReceiptData>({
    addressLine1: "House No. 45D Miran Shah Road near",
    addressLine2: "Spar Supermarket",
    billType: "Customer Bill",
    diningType: "Dine Inn",
    tokenNo: "1",
    orderNo: "00039/2M1",
    dateTime: "4-2-2026 6:00 pm",
    waiter: "Manager",
    user: "MIMI MO Cashiers",
    table: "Party Special",
    items: [
      { id: 1, line1: "Mini Zinger Burger", line2: "Served With Fries", line3: "", qty: "40.00", qtyUnit: "Servings", rate: "600.00", amount: "24000.00" },
      { id: 2, line1: "Club Sandwich Served", line2: "With Fries", line3: "", qty: "15.00", qtyUnit: "Servings", rate: "850.00", amount: "12750.00" },
      { id: 3, line1: "Strips (4 Pieces)", line2: "Served With Fries", line3: "", qty: "15.00", qtyUnit: "Servings", rate: "690.00", amount: "10350.00" },
      { id: 4, line1: "Cola Next 300ml", line2: "", line3: "", qty: "13.00", qtyUnit: "Bottle", rate: "100.00", amount: "1300.00" },
      { id: 5, line1: "Fizzup 300 ml", line2: "", line3: "", qty: "7.00", qtyUnit: "Bottle", rate: "100.00", amount: "700.00" },
      { id: 6, line1: "Pakola water 330ml", line2: "", line3: "", qty: "11.00", qtyUnit: "Drink", rate: "100.00", amount: "1100.00" },
      { id: 7, line1: "Pakola 300ML", line2: "", line3: "", qty: "12.00", qtyUnit: "Bottle", rate: "100.00", amount: "1200.00" },
      { id: 8, line1: "Club Sandwich Served", line2: "With Fries", line3: "", qty: "1.00", qtyUnit: "Servings", rate: "850.00", amount: "850.00" },
      { id: 9, line1: "Strips (4 Pieces)", line2: "Served With Fries", line3: "", qty: "1.00", qtyUnit: "Servings", rate: "690.00", amount: "690.00" },
    ],
    noOfItems: "9.00",
    totalQty: "115",
    totalAmount: "52940.00",
    remarks: "null",
    printDate: "7-2-2026",
    printTime: "6:44",
    printTimeAmPm: "pm",
    logoMode: 'text',
    logoText: "mInI mo's",
    logoImageUrl: null,
    logoFontFamily: "'Rubik Bubbles'",
    logoFontSize: 38,
    logoFontWeight: '700',
  });

  const handlePrint = () => {
    const printContent = printRef.current?.innerHTML;
    if (printContent) {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        const logoStyleRule = receipt.logoMode === 'text' 
          ? `.fallback-title { font-family: ${receipt.logoFontFamily} !important; font-size: ${receipt.logoFontSize}px !important; font-weight: ${receipt.logoFontWeight} !important; text-align: center; color: #000; line-height: 1; }`
          : '';

        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
          <head>
            <title>Receipt</title>
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap');
              @import url('https://fonts.googleapis.com/css2?family=Rubik+Bubbles&display=swap');
              
              @page { size: 80mm auto; margin: 0; }
              * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; color-adjust: exact !important; }
              
              html, body {
                width: 380px;
                margin: 0;
                padding: 0;
                background: white;
              }
              
              body {
                margin: 0;
                padding: 0;
                background: white;
                font-family: 'Roboto', 'Helvetica Neue', Helvetica, Arial, sans-serif !important;
              }
              
              .receipt-paper {
                font-family: 'Roboto', 'Helvetica Neue', Helvetica, Arial, sans-serif !important;
                width: 380px;
                background-color: #fff;
                padding: 20px 25px 10px 25px;
                color: #1a1a1a;
                font-size: 11px;
                line-height: 1.2;
                margin: 0 auto;
                box-shadow: none;
                font-weight: 500;
              }
              
              .logo-container { display: flex; justify-content: center; margin-bottom: 2px; width: 100%; overflow: hidden; }
              .logo-img { width: 200px; height: auto; filter: grayscale(100%) contrast(150%); mix-blend-mode: multiply; display: block; }
              ${logoStyleRule}
              .tagline { font-family: monospace; font-size: 10px; text-align: center; letter-spacing: 3px; margin-bottom: 5px; }
              .address { text-align: center; font-size: 13px; font-weight: 800; margin-bottom: 5px; line-height: 1.1; padding: 0 15px; font-family: 'Roboto', 'Helvetica Neue', Helvetica, Arial, sans-serif !important; }
              .bill-type-container { padding: 0 5px 2px 5px; margin-bottom: 2px; }
              .bill-type-box { border: 1px solid #000; text-align: center; padding: 1px 0; font-size: 11px; font-weight: 600; font-family: 'Roboto', 'Helvetica Neue', Helvetica, Arial, sans-serif !important; }
              .dine-inn-container { border-top: 1px solid #000; border-bottom: 1px solid #000; text-align: center; margin: 2px 0; padding: 1px 0; font-size: 11px; font-family: 'Roboto', 'Helvetica Neue', Helvetica, Arial, sans-serif !important; }
              .token-wrapper { display: flex; justify-content: center; margin: 5px 0 15px 0; }
              .token-box { border: 1px solid #000; padding: 1px 18px; font-weight: 600; font-size: 12px; background: #fff; font-family: 'Roboto', 'Helvetica Neue', Helvetica, Arial, sans-serif !important; }
              .info-grid { display: grid; grid-template-columns: 80px 10px 1fr; font-size: 11px; margin-bottom: 15px; line-height: 1.25; padding-left: 20px; font-family: 'Roboto', 'Helvetica Neue', Helvetica, Arial, sans-serif !important; }
              .info-label { font-weight: 500; }
              .info-sep { text-align: center; }
              .info-val { font-weight: 500; }
              .items-table { width: 100%; border-collapse: collapse; margin-top: 5px; font-size: 9.5px; font-family: 'Roboto', 'Helvetica Neue', Helvetica, Arial, sans-serif !important; }
              .items-table thead th { border-top: 1px dashed #000; border-bottom: 1px dashed #000; text-align: center; padding: 3px 0; font-weight: 800; text-transform: uppercase; }
              .items-table thead th:first-child { text-align: left; padding-left: 5px; }
              .items-table thead th:last-child { padding-right: 5px; }
              .col-desc { width: 42%; }
              .col-qty { width: 14%; }
              .col-rate { width: 18%; }
              .col-amt { width: 26%; }
              .items-table tbody td { padding: 4px 0; vertical-align: top; line-height: 1.1; font-family: 'Roboto', 'Helvetica Neue', Helvetica, Arial, sans-serif !important; }
              .desc-cell { text-align: left; padding-left: 5px; font-weight: 500; }
              .qty-cell { text-align: center; font-weight: 500; }
              .rate-cell { text-align: right; padding-right: 20px; }
              .amt-cell { text-align: right; padding-right: 5px; }
              .rs-sub { display: block; font-size: 8px; text-align: center; width: 100%; font-family: 'Roboto', 'Helvetica Neue', Helvetica, Arial, sans-serif !important; }
              .dashed-separator { width: 100%; border-bottom: 1px dashed #000; margin: 5px 0; }
              .totals-flex { display: flex; font-size: 11px; margin-top: 5px; line-height: 1.3; font-family: 'Roboto', 'Helvetica Neue', Helvetica, Arial, sans-serif !important; }
              .grand-total-box { display: flex; justify-content: flex-end; margin-right: 5px; margin-top: 5px; }
              .grand-total-inner { border-top: 1px solid #000; border-bottom: 1px solid #000; display: flex; padding: 2px 0; font-weight: 800; font-size: 13px; width: 150px; font-family: 'Roboto', 'Helvetica Neue', Helvetica, Arial, sans-serif !important; }
              .remarks-row { margin-top: 35px; margin-bottom: 25px; padding-left: 20px; font-weight: 600; font-size: 11px; font-family: 'Roboto', 'Helvetica Neue', Helvetica, Arial, sans-serif !important; }
              .print-info-box { border-top: 1px dashed #000; border-bottom: 1px dashed #000; display: flex; justify-content: space-between; padding: 2px 5px; font-size: 11px; margin-top: 10px; font-family: 'Roboto', 'Helvetica Neue', Helvetica, Arial, sans-serif !important; }
              .powered-by { margin-top: 5px; text-align: center; font-size: 9px; display: flex; align-items: center; justify-content: center; gap: 5px; color: #333; font-family: 'Roboto', 'Helvetica Neue', Helvetica, Arial, sans-serif !important; }
              .cis-logo { font-weight: bold; font-style: italic; display: flex; align-items: center; font-family: 'Roboto', 'Helvetica Neue', Helvetica, Arial, sans-serif !important; }
            </style>
          </head>
          <body>
            <div class="receipt-paper">${printContent}</div>
          </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => {
          printWindow.print();
          printWindow.close();
        }, 500);
      }
    }
  };

  const updateField = (field: keyof ReceiptData, value: string) => {
    setReceipt(prev => ({ ...prev, [field]: value }));
  };

  const updateItem = (id: number, field: keyof ReceiptItem, value: string) => {
    setReceipt(prev => ({
      ...prev,
      items: prev.items.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  const addItem = () => {
    setReceipt(prev => ({
      ...prev,
      items: [...prev.items, { ...defaultItem, id: Date.now() }]
    }));
  };

  const removeItem = (id: number) => {
    setReceipt(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id)
    }));
  };

  const handleLogoImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        setReceipt(prev => ({
          ...prev,
          logoImageUrl: imageUrl
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLogoImage = () => {
    setReceipt(prev => ({
      ...prev,
      logoImageUrl: null,
      logoMode: 'text'
    }));
  };

  const updateLogoField = (field: 'logoMode' | 'logoText' | 'logoFontFamily' | 'logoFontSize' | 'logoFontWeight', value: any) => {
    setReceipt(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-500 p-4">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Rubik+Bubbles&display=swap');

        .receipt-paper {
          font-family: 'Roboto', 'Helvetica Neue', Helvetica, Arial, sans-serif;
          width: 380px;
          background-color: #fff;
          padding: 20px 25px 10px 25px;
          color: #1a1a1a;
          font-size: 11px;
          line-height: 1.2;
          margin: 0 auto;
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
          font-weight: 500;
        }

        .logo-container {
          display: flex;
          justify-content: center;
          margin-bottom: 2px;
          width: 100%;
          overflow: hidden;
        }

        .logo-img {
          width: 200px;
          height: auto;
          filter: grayscale(100%) contrast(150%);
          mix-blend-mode: multiply;
          display: block;
        }

        .fallback-title {
          font-family: 'Rubik Bubbles', cursive;
          font-size: 38px;
          text-align: center;
          color: #000;
          line-height: 1;
        }

        .tagline {
           font-family: monospace;
           font-size: 10px;
           text-align: center;
           letter-spacing: 3px;
           margin-bottom: 5px;
        }

        .address {
          text-align: center;
          font-size: 13px;
          font-weight: 800;
          margin-bottom: 5px;
          line-height: 1.1;
          padding: 0 15px;
        }

        .bill-type-container {
          padding: 0 5px 2px 5px;
          margin-bottom: 2px;
        }
        .bill-type-box {
          border: 1px solid #000;
          text-align: center;
          padding: 1px 0;
          font-size: 11px;
          font-weight: 600;
        }

        .dine-inn-container {
          border-top: 1px solid #000;
          border-bottom: 1px solid #000;
          text-align: center;
          margin: 2px 0;
          padding: 1px 0;
          font-size: 11px;
        }

        .token-wrapper {
          display: flex;
          justify-content: center;
          margin: 5px 0 15px 0;
        }
        .token-box {
          border: 1px solid #000;
          padding: 1px 18px;
          font-weight: 600;
          font-size: 12px;
          background: #fff;
        }

        .info-grid {
          display: grid;
          grid-template-columns: 80px 10px 1fr;
          font-size: 11px;
          margin-bottom: 15px;
          line-height: 1.25;
          padding-left: 20px;
        }
        .info-label { font-weight: 500; }
        .info-sep { text-align: center; }
        .info-val { font-weight: 500; }

        .items-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 5px;
          font-size: 9.5px;
        }
        
        .items-table thead th {
          border-top: 1px dashed #000;
          border-bottom: 1px dashed #000;
          text-align: center;
          padding: 3px 0;
          font-weight: 800;
          text-transform: uppercase;
        }
        .items-table thead th:first-child { text-align: left; padding-left: 5px; }
        .items-table thead th:last-child { padding-right: 5px; }

        .col-desc { width: 42%; }
        .col-qty { width: 14%; }
        .col-rate { width: 18%; }
        .col-amt { width: 26%; }

        .items-table tbody td {
          padding: 4px 0;
          vertical-align: top;
          line-height: 1.1;
        }
        
        .desc-cell {
          text-align: left;
          padding-left: 5px;
          font-weight: 500;
        }
        .qty-cell {
          text-align: center;
          font-weight: 500;
        }
        .rate-cell {
          text-align: right;
          padding-right: 20px;
        }
        .amt-cell {
          text-align: right;
          padding-right: 5px;
        }

        .rs-sub {
          display: block;
          font-size: 8px;
          text-align: center;
          width: 100%;
        }

        .dashed-separator {
          width: 100%;
          border-bottom: 1px dashed #000;
          margin: 5px 0;
        }

        .totals-flex {
           display: flex;
           font-size: 11px;
           margin-top: 5px;
           line-height: 1.3;
        }

        .grand-total-box {
          display: flex;
          justify-content: flex-end;
          margin-right: 5px;
          margin-top: 5px;
        }
        
        .grand-total-inner {
          border-top: 1px solid #000;
          border-bottom: 1px solid #000;
          display: flex;
          padding: 2px 0;
          font-weight: 800;
          font-size: 13px;
          width: 150px;
        }
        
        .remarks-row {
          margin-top: 35px;
          margin-bottom: 25px;
          padding-left: 20px;
          font-weight: 600;
          font-size: 11px;
        }

        .print-info-box {
          border-top: 1px dashed #000;
          border-bottom: 1px dashed #000;
          display: flex;
          justify-content: space-between;
          padding: 2px 5px;
          font-size: 11px;
          margin-top: 10px;
        }

        .powered-by {
          margin-top: 5px;
          text-align: center;
          font-size: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          color: #333;
        }
        .cis-logo {
          font-weight: bold;
          font-style: italic;
          display: flex;
          align-items: center;
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        {/* Header Controls */}
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-200">Receipt Editor</h1>
          <Button onClick={handlePrint} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
            <Printer size={18} />
            Print Receipt
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Editor Form */}
          <div className="bg-white rounded-lg shadow-md p-6 max-h-[85vh] overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">Edit Receipt Details</h2>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Address Line 1</Label>
                <Input value={receipt.addressLine1} onChange={(e) => updateField('addressLine1', e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label>Address Line 2</Label>
                <Input value={receipt.addressLine2} onChange={(e) => updateField('addressLine2', e.target.value)} />
              </div>

              {/* Logo Editor Section */}
              <div className="pt-4 border-t">
                <h3 className="text-base font-semibold mb-3 text-gray-700">Logo Settings</h3>
                
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label>Logo Mode</Label>
                    <div className="flex gap-4">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          value="text"
                          checked={receipt.logoMode === 'text'}
                          onChange={(e) => updateLogoField('logoMode', e.target.value)}
                          className="w-4 h-4 mr-2"
                        />
                        <span className="text-sm text-gray-700">Text Logo</span>
                      </label>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          value="image"
                          checked={receipt.logoMode === 'image'}
                          onChange={(e) => updateLogoField('logoMode', e.target.value)}
                          className="w-4 h-4 mr-2"
                        />
                        <span className="text-sm text-gray-700">Image Logo</span>
                      </label>
                    </div>
                  </div>

                  {receipt.logoMode === 'text' ? (
                    <>
                      <div className="space-y-2">
                        <Label>Logo Text</Label>
                        <Input
                          value={receipt.logoText}
                          onChange={(e) => updateLogoField('logoText', e.target.value)}
                          placeholder="Enter logo text"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Font Family</Label>
                        <select
                          value={receipt.logoFontFamily}
                          onChange={(e) => updateLogoField('logoFontFamily', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="Arial">Arial</option>
                          <option value="Helvetica">Helvetica</option>
                          <option value="Roboto">Roboto</option>
                          <option value="Georgia">Georgia</option>
                          <option value="'Courier New'">Courier New</option>
                          <option value="'Rubik Bubbles'">Rubik Bubbles</option>
                          <option value="monospace">Monospace</option>
                          <option value="serif">Serif</option>
                          <option value="sans-serif">Sans-serif</option>
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label>Font Size (px)</Label>
                          <div className="flex gap-2">
                            <Input
                              type="number"
                              min="16"
                              max="60"
                              value={receipt.logoFontSize}
                              onChange={(e) => updateLogoField('logoFontSize', parseInt(e.target.value))}
                              className="flex-1"
                            />
                            <input
                              type="range"
                              min="16"
                              max="60"
                              value={receipt.logoFontSize}
                              onChange={(e) => updateLogoField('logoFontSize', parseInt(e.target.value))}
                              className="flex-1"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Font Weight</Label>
                          <select
                            value={receipt.logoFontWeight}
                            onChange={(e) => updateLogoField('logoFontWeight', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="400">Normal</option>
                            <option value="500">Medium</option>
                            <option value="700">Bold</option>
                            <option value="800">Extra Bold</option>
                            <option value="900">Black</option>
                          </select>
                        </div>
                      </div>

                      <div className="bg-gray-100 p-3 rounded border">
                        <p className="text-xs text-gray-600 mb-2">Preview:</p>
                        <div
                          style={{
                            fontFamily: receipt.logoFontFamily,
                            fontSize: `${receipt.logoFontSize}px`,
                            fontWeight: receipt.logoFontWeight,
                            textAlign: 'center',
                            color: '#000',
                            lineHeight: '1',
                            minHeight: '60px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          {receipt.logoText}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <Label>Upload Logo Image</Label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleLogoImageUpload}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        />
                      </div>

                      {receipt.logoImageUrl && (
                        <div className="space-y-2">
                          <p className="text-xs text-gray-600">Image Preview:</p>
                          <img
                            src={receipt.logoImageUrl}
                            alt="Logo preview"
                            className="max-h-32 max-w-full mx-auto rounded border"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={handleRemoveLogoImage}
                            className="w-full"
                          >
                            Remove Image
                          </Button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Bill Type</Label>
                  <Input value={receipt.billType} onChange={(e) => updateField('billType', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Dining Type</Label>
                  <Input value={receipt.diningType} onChange={(e) => updateField('diningType', e.target.value)} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Token No</Label>
                  <Input value={receipt.tokenNo} onChange={(e) => updateField('tokenNo', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Order No</Label>
                  <Input value={receipt.orderNo} onChange={(e) => updateField('orderNo', e.target.value)} />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Date & Time</Label>
                <Input value={receipt.dateTime} onChange={(e) => updateField('dateTime', e.target.value)} />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-2">
                  <Label>Waiter</Label>
                  <Input value={receipt.waiter} onChange={(e) => updateField('waiter', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>User</Label>
                  <Input value={receipt.user} onChange={(e) => updateField('user', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Table</Label>
                  <Input value={receipt.table} onChange={(e) => updateField('table', e.target.value)} />
                </div>
              </div>

              {/* Items */}
              <div className="pt-4 border-t">
                <div className="flex justify-between items-center mb-3">
                  <Label className="text-base font-semibold">Items</Label>
                  <Button type="button" size="sm" onClick={addItem} className="flex items-center gap-1">
                    <Plus size={14} /> Add Item
                  </Button>
                </div>

                <div className="space-y-3">
                  {receipt.items.map((item, index) => (
                    <div key={item.id} className="bg-gray-50 p-3 rounded border">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-600">Item {index + 1}</span>
                        <Button type="button" size="sm" variant="destructive" onClick={() => removeItem(item.id)} className="h-6 w-6 p-0">
                          <Trash2 size={12} />
                        </Button>
                      </div>
                      <div className="space-y-2">
                        <Input placeholder="Item Name" value={item.line1} onChange={(e) => updateItem(item.id, 'line1', e.target.value)} />
                        <Input placeholder="Description (optional)" value={item.line2} onChange={(e) => updateItem(item.id, 'line2', e.target.value)} />
                        <div className="grid grid-cols-4 gap-2">
                          <Input placeholder="Qty" value={item.qty} onChange={(e) => updateItem(item.id, 'qty', e.target.value)} />
                          <Input placeholder="Unit" value={item.qtyUnit} onChange={(e) => updateItem(item.id, 'qtyUnit', e.target.value)} />
                          <Input placeholder="Rate" value={item.rate} onChange={(e) => updateItem(item.id, 'rate', e.target.value)} />
                          <Input placeholder="Amount" value={item.amount} onChange={(e) => updateItem(item.id, 'amount', e.target.value)} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-4 border-t">
                <div className="space-y-2">
                  <Label>No Of Items</Label>
                  <Input value={receipt.noOfItems} onChange={(e) => updateField('noOfItems', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Total Qty</Label>
                  <Input value={receipt.totalQty} onChange={(e) => updateField('totalQty', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Total Amount</Label>
                  <Input value={receipt.totalAmount} onChange={(e) => updateField('totalAmount', e.target.value)} />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Remarks</Label>
                <Input value={receipt.remarks} onChange={(e) => updateField('remarks', e.target.value)} />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-2">
                  <Label>Print Date</Label>
                  <Input value={receipt.printDate} onChange={(e) => updateField('printDate', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Print Time</Label>
                  <Input value={receipt.printTime} onChange={(e) => updateField('printTime', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>AM/PM</Label>
                  <Input value={receipt.printTimeAmPm} onChange={(e) => updateField('printTimeAmPm', e.target.value)} />
                </div>
              </div>
            </div>
          </div>

          {/* Receipt Preview */}
          <div className="bg-gray-400 rounded-lg shadow-md p-6 flex justify-center overflow-auto max-h-[85vh]">
            <div ref={printRef} className="receipt-paper">
              <div className="logo-container">
                {receipt.logoMode === 'image' && receipt.logoImageUrl ? (
                  <img
                    src={receipt.logoImageUrl}
                    alt="Custom logo"
                    className="logo-img"
                  />
                ) : (
                  <div
                    className="fallback-title"
                    style={{
                      fontFamily: receipt.logoFontFamily,
                      fontSize: `${receipt.logoFontSize}px`,
                      fontWeight: receipt.logoFontWeight
                    }}
                  >
                    {receipt.logoText}
                  </div>
                )}
              </div>

              <div className="tagline">---------PLAY CAFE----------</div>

              <div className="address">
                {receipt.addressLine1}<br />
                {receipt.addressLine2}
              </div>

              <div className="bill-type-container">
                <div className="bill-type-box">{receipt.billType}</div>
              </div>

              <div className="dine-inn-container">{receipt.diningType}</div>

              <div className="token-wrapper">
                <div className="token-box">Token No: {receipt.tokenNo}</div>
              </div>

              <div className="info-grid">
                <span className="info-label">Order No</span>
                <span className="info-sep">:</span>
                <span className="info-val">{receipt.orderNo}</span>

                <span className="info-label">Date & Time</span>
                <span className="info-sep">:</span>
                <span className="info-val">{receipt.dateTime}</span>

                <span className="info-label">Waiter</span>
                <span className="info-sep">:</span>
                <span className="info-val">{receipt.waiter}</span>

                <span className="info-label">User</span>
                <span className="info-sep">:</span>
                <span className="info-val">{receipt.user}</span>

                <span className="info-label">Table</span>
                <span className="info-sep">:</span>
                <span className="info-val">{receipt.table}</span>
              </div>

              <table className="items-table">
                <thead>
                  <tr>
                    <th className="col-desc">DESCRIPTION</th>
                    <th className="col-qty">QTY</th>
                    <th className="col-rate">RATE</th>
                    <th className="col-amt">
                      AMOUNTPKR
                      <span className="rs-sub">(Rs)</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {receipt.items.map((item) => (
                    <tr key={item.id}>
                      <td className="desc-cell">
                        {item.line1}
                        {item.line2 && <br />}
                        {item.line2 && <span style={{ fontSize: '9px' }}>{item.line2}</span>}
                      </td>
                      <td className="qty-cell">
                        {item.qty}<br />
                        <span style={{ fontSize: '9px' }}>{item.qtyUnit}</span>
                      </td>
                      <td className="rate-cell">{item.rate}</td>
                      <td className="amt-cell">{item.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="dashed-separator"></div>

              <div className="totals-flex">
                <div style={{ width: '35%', paddingLeft: '5px' }}>No Of Items: {receipt.noOfItems}</div>
                <div style={{ width: '15%', paddingLeft: '120px', fontWeight: 'bold' }}>Total</div>
                <div style={{ width: '50%' }}></div>
              </div>

              <div className="totals-flex">
                <div style={{ width: '35%' }}></div>
                <div style={{ width: '15%', paddingLeft: '120px' }}>Qty:</div>
                <div style={{ width: '50%', textAlign: 'right', paddingRight: '5px' }}>{receipt.totalAmount}</div>
              </div>

              <div className="totals-flex" style={{ marginBottom: '5px' }}>
                <div style={{ width: '35%' }}></div>
                <div style={{ width: '15%', paddingLeft: '120px' }}>{receipt.totalQty}</div>
                <div style={{ width: '50%' }}></div>
              </div>

              <div className="grand-total-box">
                <div className="grand-total-inner">
                  <span style={{ paddingLeft: '20px' }}>Total :</span>
                  <span style={{ marginLeft: 'auto', paddingRight: '5px' }}>{receipt.totalAmount}</span>
                </div>
              </div>

              <div className="remarks-row">
                Remarks: {receipt.remarks}
              </div>

              <div className="print-info-box">
                <span>Print Date: {receipt.printDate}</span>
                <span>Print Time: {receipt.printTime} <span style={{ fontSize: '9px', textTransform: 'lowercase' }}>{receipt.printTimeAmPm}</span></span>
              </div>

              <div className="powered-by">
                <span>Powered by</span>
                <span className="cis-logo">
                  <span style={{ fontSize: '14px' }}>☁</span> cis<span style={{ color: '#444' }}>e</span>POS
                </span>
                <span style={{ margin: '0 5px' }}><Link size={10} /></span>
                <span>cisapos.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
