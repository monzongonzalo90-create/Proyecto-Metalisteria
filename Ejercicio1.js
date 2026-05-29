<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Factura de Venta - Dobladora & Cortadora</title>
    <style>
        :root {
            --primary-blue: #0A2A6E;
            --border-color: #0A2A6E;
            --bg-light: #e8ecf0;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: "Courier New", Courier, monospace; }
        body {
            background-color: var(--bg-light);
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 30px 10px;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
        }
        .actions-panel {
            display: flex;
            gap: 15px;
            margin-bottom: 20px;
            width: 210mm;
        }
        .btn {
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            font-size: 13px;
            font-weight: bold;
            cursor: pointer;
        }
        .btn-print { background-color: var(--primary-blue); color: #fff; }
        .btn-row { background-color: #27ae60; color: #fff; }

        .invoice-container {
            width: 210mm;
            background-color: #ffffff;
            border: 2.5px solid var(--border-color);
            padding: 12mm 10mm;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            display: flex;
            flex-direction: column;
        }

        input[type="text"], input[type="number"], textarea {
            border: none;
            background: transparent;
            font-family: inherit;
            font-size: 12px;
            color: #000;
            width: 100%;
            font-weight: bold;
        }
        input:focus { outline: none; background-color: rgba(10,42,110,0.04); }
        input::-webkit-outer-spin-button, input::-webkit-inner-spin-button { -webkit-appearance: none; }
        input[type=number] { -moz-appearance: textfield; }

        /* HEADER */
        .invoice-header {
            display: grid;
            grid-template-columns: 18% 52% 30%;
            align-items: center;
            border-bottom: 2px solid var(--border-color);
            padding-bottom: 10px;
            margin-bottom: 12px;
            gap: 8px;
        }
        .logo-circle {
            width: 62px;
            height: 62px;
            background-color: var(--primary-blue);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .logo-text {
            color: #fff;
            font-size: 22px;
            font-weight: 900;
            font-family: Arial Black, sans-serif;
            letter-spacing: -1px;
            text-align: center;
            line-height: 1;
        }
        .company-details { padding-left: 8px; color: var(--primary-blue); }
        .company-name {
            font-size: 18px;
            font-weight: 900;
            color: var(--primary-blue);
            font-family: Arial Black, sans-serif;
            margin-bottom: 4px;
            line-height: 1.1;
        }
        .company-sub { font-size: 10px; line-height: 1.5; color: var(--primary-blue); }
        .invoice-number-box {
            border: 2px solid var(--border-color);
            border-radius: 4px;
            text-align: center;
            padding: 8px 6px;
        }
        .inv-title { font-size: 10px; font-weight: bold; color: var(--primary-blue); letter-spacing: 0.5px; margin-bottom: 3px; }
        .inv-subtitle { font-size: 10px; font-weight: bold; color: var(--primary-blue); margin-bottom: 5px; }
        .inv-number {
            font-size: 20px;
            font-weight: 900;
            color: #c0392b;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 4px;
        }
        .inv-number input { color: #c0392b; font-size: 20px; width: 70px; font-weight: 900; }

        /* CUSTOMER */
        .customer-sec {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 6px 15px;
            margin-bottom: 14px;
        }
        .field-group {
            display: flex;
            align-items: flex-end;
            font-size: 11px;
            color: var(--primary-blue);
            font-weight: bold;
        }
        .field-group label { white-space: nowrap; margin-right: 5px; text-transform: uppercase; font-size: 11px; }
        .field-value {
            flex-grow: 1;
            border-bottom: 1.5px solid var(--border-color);
            padding-bottom: 1px;
        }
        .field-group.full { grid-column: 1 / -1; }

        /* TABLE */
        .table-wrapper { margin-bottom: 0; }
        .invoice-table {
            width: 100%;
            border-collapse: collapse;
            border: 2px solid var(--border-color);
        }
        .invoice-table th {
            background-color: rgba(10,42,110,0.06);
            color: var(--primary-blue);
            font-size: 11px;
            font-weight: bold;
            padding: 7px 4px;
            border: 1px solid var(--border-color);
            text-align: center;
            letter-spacing: 1px;
        }
        .invoice-table td {
            border-right: 1px solid var(--border-color);
            border-bottom: 1px solid rgba(10,42,110,0.15);
            padding: 5px 4px;
            height: 22px;
        }
        .invoice-table tr:last-child td { border-bottom: 2px solid var(--border-color); }

        .col-detail { width: 55%; }
        .col-qty { width: 10%; text-align: center; }
        .col-unit { width: 17%; text-align: right; }
        .col-total { width: 18%; text-align: right; border-right: none !important; }
        .col-qty input { text-align: center; }
        .col-unit input, .col-total input { text-align: right; padding-right: 4px; }

        /* FOOTER */
        .invoice-footer-block {
            display: grid;
            grid-template-columns: 65% 35%;
            border: 2px solid var(--border-color);
            border-top: none;
        }
        .legal-box {
            padding: 8px 10px;
            font-size: 9px;
            color: #333;
            line-height: 1.45;
            border-right: 2px solid var(--border-color);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }
        .legal-text { text-align: justify; font-style: italic; }
        .signature-area {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin-top: 12px;
        }
        .sig-line {
            border-top: 1px solid var(--border-color);
            text-align: center;
            font-size: 9px;
            padding-top: 3px;
            margin-top: 12px;
            color: var(--primary-blue);
            font-weight: bold;
        }
        .totals-box { display: flex; flex-direction: column; }
        .total-row {
            display: grid;
            grid-template-columns: 45% 55%;
            flex-grow: 1;
            border-bottom: 1px solid var(--border-color);
            align-items: center;
            min-height: 28px;
        }
        .total-row:last-child {
            border-bottom: none;
            background-color: rgba(10,42,110,0.06);
        }
        .total-label {
            font-size: 11px;
            font-weight: bold;
            color: var(--primary-blue);
            padding-left: 8px;
            text-transform: uppercase;
        }
        .total-val-wrapper {
            display: flex;
            align-items: center;
            padding-right: 8px;
            border-left: 1px solid var(--border-color);
            height: 100%;
        }
        .total-val-wrapper span {
            font-size: 12px;
            font-weight: bold;
            padding-left: 5px;
            color: var(--primary-blue);
        }
        .total-val-wrapper input { text-align: right; font-size: 13px; }

        .imprenta-note {
            font-size: 8px;
            color: #666;
            text-align: left;
            margin-top: 6px;
            font-style: italic;
        }

        @media print {
            body { background: none; padding: 0; margin: 0; }
            .actions-panel { display: none !important; }
            .invoice-container {
                box-shadow: none;
                width: 210mm;
                position: absolute;
                top: 0; left: 0;
            }
        }
    </style>
</head>
<body>

<div class="actions-panel">
    <button class="btn btn-print" onclick="window.print()">🖨️ Imprimir Factura</button>
    <button class="btn btn-row" onclick="addNewRow()">➕ Agregar Fila</button>
</div>

<main class="invoice-container">

    <header class="invoice-header">
        <div class="logo-circle">
            <div class="logo-text">G<br>M</div>
        </div>
        <div class="company-details">
            <div class="company-name">Dobladora &amp; Cortadora</div>
            <div class="company-sub">
                Gonzalo Monzón Melo &nbsp; NIT. 94.327.024<br>
                Servicio de doblado de Puertas, Ventanas, canales, Estructuras Metálicas<br>
                Antejardines, Encerrados, soldadura Mig – Tig<br>
                <strong>Carrera 19 # 39 – 50 &nbsp;|&nbsp; Cel. 313 214 3165 Palmira</strong>
            </div>
        </div>
        <div class="invoice-number-box">
            <div class="inv-title">FACTURA DE VENTA</div>
            <div class="inv-number">
                <span>No.</span>
                <input type="text" value="0202" maxlength="8">
            </div>
        </div>
    </header>

    <section class="customer-sec">
        <div class="field-group">
            <label>Fecha:</label>
            <div class="field-value"><input type="text" value="28 de Mayo de 2026"></div>
        </div>
        <div class="field-group">
            <label>Tel / Cel:</label>
            <div class="field-value"><input type="text" placeholder=""></div>
        </div>
        <div class="field-group full">
            <label>Cliente:</label>
            <div class="field-value"><input type="text" placeholder=""></div>
        </div>
        <div class="field-group full">
            <label>Dirección:</label>
            <div class="field-value"><input type="text" placeholder=""></div>
        </div>
        <div class="field-group">
            <label>C.C. / NIT:</label>
            <div class="field-value"><input type="text" placeholder=""></div>
        </div>
    </section>

    <section class="table-wrapper">
        <table class="invoice-table" id="itemsTable">
            <thead>
                <tr>
                    <th class="col-detail">D E T A L L E</th>
                    <th class="col-qty">CANT.</th>
                    <th class="col-unit">VALOR UNITARIO</th>
                    <th class="col-total">VALOR TOTAL</th>
                </tr>
            </thead>
            <tbody>
                <tr><td class="col-detail"><input type="text" placeholder=""></td><td class="col-qty"><input type="number" value="" oninput="calculateRow(this)"></td><td class="col-unit"><input type="number" value="" step="any" oninput="calculateRow(this)"></td><td class="col-total"><input type="number" value="" readonly></td></tr>
                <tr><td class="col-detail"><input type="text" placeholder=""></td><td class="col-qty"><input type="number" value="" oninput="calculateRow(this)"></td><td class="col-unit"><input type="number" value="" step="any" oninput="calculateRow(this)"></td><td class="col-total"><input type="number" value="" readonly></td></tr>
                <tr><td class="col-detail"><input type="text" placeholder=""></td><td class="col-qty"><input type="number" value="" oninput="calculateRow(this)"></td><td class="col-unit"><input type="number" value="" step="any" oninput="calculateRow(this)"></td><td class="col-total"><input type="number" value="" readonly></td></tr>
                <tr><td class="col-detail"><input type="text" placeholder=""></td><td class="col-qty"><input type="number" value="" oninput="calculateRow(this)"></td><td class="col-unit"><input type="number" value="" step="any" oninput="calculateRow(this)"></td><td class="col-total"><input type="number" value="" readonly></td></tr>
                <tr><td class="col-detail"><input type="text" placeholder=""></td><td class="col-qty"><input type="number" value="" oninput="calculateRow(this)"></td><td class="col-unit"><input type="number" value="" step="any" oninput="calculateRow(this)"></td><td class="col-total"><input type="number" value="" readonly></td></tr>
                <tr><td class="col-detail"><input type="text" placeholder=""></td><td class="col-qty"><input type="number" value="" oninput="calculateRow(this)"></td><td class="col-unit"><input type="number" value="" step="any" oninput="calculateRow(this)"></td><td class="col-total"><input type="number" value="" readonly></td></tr>
                <tr><td class="col-detail"><input type="text" placeholder=""></td><td class="col-qty"><input type="number" value="" oninput="calculateRow(this)"></td><td class="col-unit"><input type="number" value="" step="any" oninput="calculateRow(this)"></td><td class="col-total"><input type="number" value="" readonly></td></tr>
            </tbody>
        </table>
    </section>

    <footer class="invoice-footer-block">
        <div class="legal-box">
            <div class="legal-text">
                La presente factura cambiaria de venta, se asimila en todos sus efectos a una letra de cambio según artículos 773 y 774 del código de comercio. Causará intereses de mora a la tasa máxima permitida por la ley a partir de la fecha de vencimiento.
            </div>
            <div class="signature-area">
                <div class="sig-line">Aceptada</div>
                <div class="sig-line">&nbsp;</div>
            </div>
        </div>
        <div class="totals-box">
            <div class="total-row" style="flex:1">
                <div class="total-label">&nbsp;</div>
                <div class="total-val-wrapper"></div>
            </div>
            <div class="total-row" style="border-top: 2px solid var(--border-color);">
                <div class="total-label">TOTAL $</div>
                <div class="total-val-wrapper">
                    <span>$</span>
                    <input type="number" id="invoiceGrandTotal" value="" readonly style="font-size:15px;">
                </div>
            </div>
        </div>
    </footer>

    <div class="imprenta-note">Imp. Copi Empastados J.D. Alejandra Diaz. Nit. 66.777.184 - 1</div>

</main>

<script>
    function addNewRow() {
        const tbody = document.getElementById("itemsTable").getElementsByTagName("tbody")[0];
        const row = tbody.insertRow();
        row.innerHTML = `
            <td class="col-detail"><input type="text"></td>
            <td class="col-qty"><input type="number" value="" oninput="calculateRow(this)"></td>
            <td class="col-unit"><input type="number" value="" step="any" oninput="calculateRow(this)"></td>
            <td class="col-total"><input type="number" value="" readonly></td>
        `;
    }
    function calculateRow(el) {
        const row = el.closest('tr');
        const qty = parseFloat(row.querySelector('.col-qty input').value) || 0;
        const unit = parseFloat(row.querySelector('.col-unit input').value) || 0;
        row.querySelector('.col-total input').value = qty * unit || '';
        updateTotal();
    }
    function updateTotal() {
        let total = 0;
        document.querySelectorAll("#itemsTable tbody .col-total input").forEach(i => {
            total += parseFloat(i.value) || 0;
        });
        document.getElementById("invoiceGrandTotal").value = total || '';
    }
</script>
</body>
</html>