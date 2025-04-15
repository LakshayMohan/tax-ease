import React, { useState } from 'react';
import './FAQs.css'; 

const faqData = [
  {
    group: 'Below 60 Years',
    questions: [
      {
        q: 'What are the income tax slabs for individuals below 60 years for FY 2025-26?',
        a: `Old Tax Regime: No tax up to ₹2,50,000; 5% for ₹2,50,001-₹5,00,000; 20% for ₹5,00,001-₹10,00,000; 30% for above ₹10,00,000
New Tax Regime: No tax up to ₹3,00,000; 5% for ₹3,00,001-₹6,00,000; 10% for ₹6,00,001-₹9,00,000; 15% for ₹9,00,001-₹12,00,000; 20% for ₹12,00,001-₹15,00,000; 30% for above ₹15,00,000`
      },
      {
        q: 'What is the standard deduction available for salaried individuals in FY 2025-26?',
        a: `Increased to ₹75,000 from previous ₹50,000. Available to all salaried individuals regardless of salary amount. Provides tax savings up to ₹7,500 for those in 30% tax bracket. Not available for self-employed individuals, professionals, and HUFs.`
      },
      {
        q: 'How does the Section 87A rebate work for FY 2025-26?',
        a: `Under new tax regime, rebate increased to ₹60,000. No income tax for individuals with net taxable income up to ₹12,00,000. For salaried individuals, considering standard deduction of ₹75,000, zero tax liability for incomes up to ₹12,75,000.`
      },
      {
        q: 'What are the surcharge rates applicable for FY 2025-26?',
        a: `10% surcharge for income between ₹50 lakh and ₹1 crore. 15% surcharge for income between ₹1 crore and ₹2 crore. 25% surcharge for income between ₹2 crore and ₹5 crore. 37% surcharge for income above ₹5 crore. Applied on income tax amount, not on total income.`
      },
      {
        q: 'How do I calculate my advance tax liability for FY 2025-26?',
        a: `Estimate total income from all sources for FY 2025-26. Subtract eligible deductions under Chapter VI-A. Calculate tax on taxable income as per chosen regime. Add applicable surcharge and 4% Health & Education Cess. Subtract any TDS/TCS already deducted. Pay advance tax if liability exceeds ₹10,000 (15% by June 15, 45% by September 15, 75% by December 15, 100% by March 15).`
      },
      {
        q: 'Which tax regime should I choose for FY 2025-26 - old or new?',
        a: `Old regime: Better if you claim substantial deductions/exemptions. New regime: Better if you have minimal deductions or prefer simplicity. Generally, if deductions exceed ₹3-4 lakh, old regime may be more beneficial.`
      },
      {
        q: 'What deductions can I claim under the old tax regime for FY 2025-26?',
        a: `Section 80C: Up to ₹1.5 lakh for investments in PPF, ELSS, NSC, etc. Section 80D: Up to ₹25,000 for health insurance premiums. Section 80E: Entire interest paid on education loan. Section 80G: Donations to approved charitable organizations. Section 80TTA: Up to ₹10,000 for interest earned on savings accounts. Section 24(b): Up to ₹2 lakh for home loan interest. HRA and LTA exemptions.`
      },
      {
        q: 'How is my tax calculated if I have income from multiple sources?',
        a: `Aggregate income under five heads: Salary, House Property, Business/Profession, Capital Gains, Other Sources. Apply specific deductions for each income head. Calculate Gross Total Income. Subtract Chapter VI-A deductions. Apply tax slab rates to Total Taxable Income. Add surcharge (if applicable) and 4% Health & Education Cess.`
      },
      {
        q: 'What are the key differences between the old and new tax regimes?',
        a: `New regime: More tax slabs with lower rates. Old regime: Various deductions and exemptions allowed. New regime: Higher basic exemption limit (₹3,00,000 vs ₹2,50,000). New regime: Higher rebate under Section 87A. Old regime: Benefits for home loans, medical insurance, and investments.`
      },
      {
        q: 'How is income from freelancing or consulting taxed?',
        a: `Taxed as "Income from Business or Profession". Can deduct legitimate business expenses. Can claim depreciation on business assets. Can opt for presumptive taxation under Section 44ADA (50% of receipts as income) if gross receipts are under ₹50 lakh. Must pay advance tax quarterly if liability exceeds ₹10,000.`
      }
    ]
  },
  {
    group: 'Senior Citizens (60-80 Years)',
    questions: [
      {
        q: 'What are the income tax slabs for senior citizens (60-80 years) for FY 2025-26?',
        a: `Old Tax Regime: No tax up to ₹3,00,000; 5% for ₹3,00,001-₹5,00,000; 20% for ₹5,00,001-₹10,00,000; 30% for above ₹10,00,000
New Tax Regime: Same slabs as for individuals below 60 years`
      },
      {
        q: 'What special tax benefits are available to senior citizens in FY 2025-26?',
        a: `Higher basic exemption limit: ₹3,00,000 under old regime. Section 80TTB: Deduction up to ₹50,000 for interest income from deposits. Higher TDS threshold: ₹1,00,000 for interest income. Section 80D: Higher deduction up to ₹50,000 for health insurance. Section 80DDB: Higher deduction up to ₹1,00,000 for specified diseases. Advance tax exemption if no business/professional income.`
      },
      {
        q: 'How does the TDS exemption work for senior citizens?',
        a: `TDS threshold doubled from ₹50,000 to ₹1,00,000 for interest income. Banks won't deduct TDS on interest up to this limit. Form 15H can be submitted to prevent TDS if total income is below taxable limit. Ensure bank has updated age details to avail this benefit.`
      },
      {
        q: 'What tax planning strategies should senior citizens consider before retirement?',
        a: `Plan investments to ensure regular income post-retirement. Maximize Section 80C deductions before retirement when income is higher. Consider shifting from growth-oriented to income-generating investments. Create a balanced portfolio of SCSS, PMVVY, tax-free bonds, and fixed deposits. Purchase adequate health insurance to maximize Section 80D benefits. Consider systematic withdrawal plans from mutual funds for tax efficiency. If possible, pay off home loans before retirement to eliminate interest burden. Evaluate partial commutation of pension versus regular pension for tax optimization.`
      },
      {
        q: 'What is the Senior Citizen Savings Scheme (SCSS) and its tax benefits?',
        a: `Government-backed savings scheme for senior citizens. 8.2% interest rate per annum (as of April 2025). Maximum investment limit of ₹30 lakh. 5-year lock-in period (extendable by 3 years). Tax benefits under Section 80C (up to ₹1.5 lakh). Quarterly interest payout. Interest income eligible for Section 80TTB deduction.`
      },
      {
        q: 'Can senior citizens claim both Section 80D and Section 80DDB benefits?',
        a: `Yes, both can be claimed simultaneously. Section 80D: Up to ₹50,000 for health insurance premiums. Section 80DDB: Up to ₹1,00,000 for treatment of specified diseases. Both are separate deductions available in the same financial year.`
      },
      {
        q: 'What is the Pradhan Mantri Vaya Vandana Yojana (PMVVY) and how does it benefit senior citizens?',
        a: `Pension scheme specifically for senior citizens. Provides guaranteed pension for 10 years. 7.4% interest rate per annum (as of April 2025). Maximum investment limit of ₹15 lakh. Premature withdrawal allowed for critical illness. Loan facility available up to 75% of purchase price after 3 years. Pension income eligible for Section 80TTB deduction.`
      },
      {
        q: 'How can senior citizens optimize tax on their pension income?',
        a: `Claim standard deduction of ₹75,000 from pension income. Invest in tax-saving instruments like SCSS and PMVVY. Claim Section 80TTB deduction for interest income. Utilize Section 80D deduction for health insurance. Consider tax-free bonds for investment returns. Split investments between spouses to utilize exemption limits.`
      },
      {
        q: 'What are the income tax implications of reverse mortgage for senior citizens?',
        a: `Loan amount received is not considered income and is tax-free. Interest accrued on the loan is not deductible. Property can be inherited by legal heirs if they repay the loan. No capital gains tax until property is actually sold. Provides tax-free regular income while continuing to live in the property.`
      },
      {
        q: 'Are senior citizens required to file income tax returns?',
        a: `Required if gross total income exceeds basic exemption limit. Seniors aged 75+ with only pension and interest from same bank are exempt. Filing advisable even below taxable limit to claim TDS refund or carry forward losses. Mandatory regardless of income for claiming refunds, having foreign assets/income, or exceeding specified spending thresholds.`
      }
    ]
  },
  {
    group: 'Super Senior Citizens (Above 80 Years)',
    questions: [
      {
        q: 'What are the income tax slabs for super senior citizens (above 80 years) for FY 2025-26?',
        a: `Old Tax Regime: No tax up to ₹5,00,000; 20% for ₹5,00,001-₹10,00,000; 30% for above ₹10,00,000
New Tax Regime: Same slabs as for individuals below 60 years`
      },
      {
        q: 'What additional tax benefits do super senior citizens get compared to senior citizens?',
        a: `Higher basic exemption limit: ₹5,00,000 under old regime. Simplified ITR filing in physical form. Relaxation from tax audit requirements. Higher rebate threshold (effectively no tax up to ₹5,00,000). All benefits available to senior citizens. Exemption from advance tax if no business/professional income.`
      },
      {
        q: 'Should super senior citizens opt for the old or new tax regime?',
        a: `Old regime advantages: Higher exemption limit, ability to claim all deductions. New regime advantages: Simplified structure, no need to maintain investment proofs. For most super seniors with medical expenses and investment income, old regime often more beneficial. Calculate tax under both regimes to determine which is better.`
      },
      {
        q: 'Are super senior citizens required to pay advance tax?',
        a: `Exempt if no income from business or profession. Not required for pension, interest, rental income, or capital gains. Required for business income if tax liability exceeds ₹10,000. Provides relief from estimating annual income in advance.`
      },
      {
        q: 'What are the simplified ITR filing options for super senior citizens?',
        a: `Option to file in physical form using ITR-1 or ITR-4. Exemption from mandatory e-filing. Can authorize a representative to file on their behalf. Simplified verification process. Possible extended deadline (check current year's notification).`
      },
      {
        q: 'Are super senior citizens exempt from tax audit requirements?',
        a: `Exemption from tax audit under Section 44AB if opting for presumptive taxation. No audit requirement if turnover is below specified limits. Simplified compliance for maintaining books of accounts. Reduces compliance burden for those with business income.`
      },
      {
        q: "How can super senior citizens claim medical expense deductions if they don't have health insurance?",
        a: `Deduction up to ₹50,000 for medical expenditure under Section 80D. Additional deduction up to ₹1,00,000 under Section 80DDB for specified diseases. Maintain proper documentation (medical bills, prescriptions, doctor's certificates). Specialist doctor certificate required for Section 80DDB claims.`
      },
      {
        q: 'What special provisions exist for super senior citizens with disabilities?',
        a: `Section 80U deduction: ₹75,000 for 40-80% disability or ₹1,25,000 for >80% disability. Additional Section 80DD deduction for dependent with disability. Higher exemption for commutation of pension in case of disability. Special benefits under government schemes for disabled senior citizens. Disability certificate required from authorized medical authority.`
      },
      {
        q: 'How can super senior citizens optimize their tax liability if they have substantial fixed deposit investments?',
        a: `Utilize higher TDS threshold of ₹1,00,000 on interest income. Claim Section 80TTB deduction up to ₹50,000. Distribute deposits across multiple banks. Consider tax-free bonds or SCSS for better tax efficiency. Opt for cumulative deposits. Submit Form 15H to prevent TDS if income below taxable limit.`
      },
      {
        q: 'What are the tax implications for super senior citizens receiving family pension?',
        a: `Family pension taxable under "Income from Other Sources". Standard deduction of 33.33% of pension or ₹15,000 (whichever is less). Remaining amount taxed as per applicable slab rates. No standard deduction of ₹75,000 available (unlike regular pension). TDS applicable if annual pension exceeds threshold. Form 15H can be submitted to avoid TDS if income below taxable limit.`
      }
    ]
  }
];


const FAQs = () => {
  const [selectedGroup, setSelectedGroup] = useState(0);
  const [openIndexes, setOpenIndexes] = useState([]);

  const handleGroupChange = (idx) => {
    setSelectedGroup(idx);
    setOpenIndexes([]); // Close all answers when switching group
  };

  const toggleAnswer = (idx) => {
    setOpenIndexes((prev) =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  return (
    <div className="faq-container" style={{ maxWidth: 700, margin: "40px auto", padding: 20 }}>
      <h2 style={{ textAlign: "center", marginBottom: 24 }}>Tax FAQs by Age Group</h2>
      <div style={{ display: "flex", justifyContent: "center", gap: 16, marginBottom: 32 }}>
        {faqData.map((section, idx) => (
          <button
            key={section.group}
            onClick={() => handleGroupChange(idx)}
            style={{
              padding: "10px 18px",
              borderRadius: 8,
              border: idx === selectedGroup ? "2px solid #2563eb" : "1px solid #ccc",
              background: idx === selectedGroup ? "#2563eb" : "#f1f5f9",
              color: idx === selectedGroup ? "#fff" : "#222",
              fontWeight: 600,
              cursor: "pointer"
            }}
          >
            {section.group}
          </button>
        ))}
      </div>
      <div>
        {faqData[selectedGroup].questions.map((item, idx) => (
          <div key={idx} style={{ borderBottom: "1px solid #eee", padding: "12px 0" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
                fontWeight: 500
              }}
              onClick={() => toggleAnswer(idx)}
            >
              <span>{item.q}</span>
              <span style={{
                fontSize: 22,
                marginLeft: 12,
                transition: "transform 0.2s",
                transform: openIndexes.includes(idx) ? "rotate(45deg)" : "rotate(0deg)"
              }}>
                +
              </span>
            </div>
            {openIndexes.includes(idx) && (
              <div
                className={`faq-answer open`}
                style={{}}
              >
                {item.a}
              </div>
            )}
            {!openIndexes.includes(idx) && (
              <div
                className="faq-answer"
                style={{}}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQs;