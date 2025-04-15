import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Chatbot.css';

const deductionLabels = {
  section80C: 'Section 80C',
  section80D: 'Section 80D',
  section80E: 'Section 80E',
  section80G: 'Section 80G',
  section80TTA: 'Section 80TTA',
  section24: 'Section 24(b)',
};

const Chatbot = ({ visible }) => {
  const [messages, setMessages] = useState([]);
  const [step, setStep] = useState(0);
  const [taxData, setTaxData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  // Fetch latest tax calculation for the user
  useEffect(() => {
    if (!visible) return;
    if (!open) return;
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user._id) {
      setMessages([{ sender: 'bot', text: 'Please login and calculate your tax first.' }]);
      setLoading(false);
      return;
    }
    axios.get(`/api/tax/user/${user._id}`)
      .then(res => {
        if (res.data && res.data.length > 0) {
          setTaxData(res.data[0]);
          setMessages([
            { sender: 'bot', text: "Hello! I'm your Tax Saving Advisor. I can help you find ways to reduce your tax liability based on your income and deductions." },
            { sender: 'bot', text: "I've loaded your financial profile. Would you like to see personalized tax-saving advice or ask about specific deductions?" }
          ]);
        } else {
          setMessages([{ sender: 'bot', text: 'Please calculate your tax first, then come back for advice.' }]);
        }
        setLoading(false);
      })
      .catch(() => {
        setMessages([{ sender: 'bot', text: 'Please calculate your tax first, then come back for advice.' }]);
        setLoading(false);
      });
  }, [visible, open]);

  // Predefined options
  const mainOptions = [
    { label: 'Show my tax-saving advice', value: 'advice' },
    { label: 'Ask about a specific deduction', value: 'deduction' },
    { label: 'Show all my tax details', value: 'details' },
  ];

  const deductionOptions = [
    'Section 80C', 'Section 80D', 'Section 80E', 'Section 80G', 'Section 80TTA', 'Section 24(b)', 'Standard Deduction'
  ];

  const moreDetailsOptions = [
    'Salary Tax Optimization', 'Investment Options', 'Home Loan Benefits', 'Health Insurance Benefits', 'No, thank you'
  ];

  // Handle user option selection
  const handleOption = (option) => {
    setMessages(msgs => [...msgs, { sender: 'user', text: option }]);
    if (option === 'Show my tax-saving advice') {
      setMessages(msgs => [...msgs, { sender: 'bot', text: 'Analyzing your profile...' }]);
      setTimeout(() => {
        setMessages(msgs => [
          ...msgs,
          ...generateAdvice(taxData),
          { sender: 'bot', text: 'Would you like more details on any of these topics?' }
        ]);
        setStep(2);
      }, 800);
    } else if (option === 'Ask about a specific deduction') {
      setMessages(msgs => [...msgs, { sender: 'bot', text: 'Which deduction would you like to know more about?' }]);
      setStep(1);
    } else if (option === 'Show all my tax details') {
      setMessages(msgs => [
        ...msgs,
        { sender: 'bot', text: formatTaxDetails(taxData) },
        { sender: 'bot', text: 'Would you like advice on any specific area?' }
      ]);
      setStep(2);
    } else if (deductionOptions.includes(option)) {
      setMessages(msgs => [...msgs, { sender: 'bot', text: getDeductionInfo(option, taxData) }]);
      setStep(1);
    } else if (moreDetailsOptions.includes(option)) {
      setMessages(msgs => [...msgs, { sender: 'bot', text: getMoreDetails(option) }]);
      setStep(2);
    }
  };

  // Generate advice based on taxData
  function generateAdvice(data) {
    if (!data) return [];
    const msgs = [];
    const { incomeData, deductionData } = data;
    // Salary Income
    if (incomeData.salaryIncome > 0) {
      if (deductionData.section80C < 150000) {
        msgs.push({ sender: 'bot', text: "You have not fully utilized your Section 80C limit (₹1.5 lakh). Consider investing in PPF, ELSS, NSC, or paying life insurance premiums to maximize this deduction." });
      }
      if ((incomeData.salaryIncome > 0) && (!deductionData.standardDeduction || deductionData.standardDeduction < 50000)) {
        msgs.push({ sender: 'bot', text: "You can claim the standard deduction of ₹50,000 available for salaried employees. Make sure this is reflected in your tax filings." });
      }
      if (deductionData.section24 === 0 && incomeData.rentalIncome === 0) {
        msgs.push({ sender: 'bot', text: "If you are paying rent but not claiming HRA, you may be eligible for HRA exemption, which can reduce your taxable income." });
      }
    }
    // Business Income
    if (incomeData.otherIncome > 0) {
      msgs.push({ sender: 'bot', text: "For your business income, ensure you claim all eligible business expenses, depreciation, and professional development costs." });
      if (incomeData.otherIncome < 2000000) {
        msgs.push({ sender: 'bot', text: "You may benefit from the presumptive taxation scheme under Section 44AD, which simplifies tax calculation for small businesses." });
      }
    }
    // Rental Income
    if (incomeData.rentalIncome > 0) {
      msgs.push({ sender: 'bot', text: "For rental income, you can claim a standard deduction of 30% of your annual rental income for maintenance and repairs." });
      if (deductionData.section24 < 200000) {
        msgs.push({ sender: 'bot', text: "If you have a home loan on your rented property, you can claim up to ₹2 lakh per year on interest payments under Section 24(b)." });
      }
    }
    // Capital Gains
    if (incomeData.capitalGains > 0) {
      msgs.push({ sender: 'bot', text: "Consider investing in tax-saving bonds under Section 54EC to save taxes on long-term capital gains from property sales." });
      msgs.push({ sender: 'bot', text: "For short-term capital gains from equity, you can use tax-loss harvesting by selling underperforming investments to offset gains." });
    }
    // Other Income
    if (incomeData.otherIncome > 0) {
      msgs.push({ sender: 'bot', text: "Ensure you are declaring all other sources of income, such as interest, dividends, or freelance work, and check if any are eligible for specific deductions." });
    }
    // Deductions
    if (deductionData.section80D < 25000) {
      msgs.push({ sender: 'bot', text: "You can save more tax by maximizing your Section 80D benefits. Consider getting health insurance for yourself and family (up to ₹25,000) and for parents (additional ₹25,000 or ₹50,000 if they're senior citizens)." });
    }
    if (deductionData.section80E === 0 && incomeData.salaryIncome > 500000) {
      msgs.push({ sender: 'bot', text: "If you or your children have educational loans, the entire interest amount is deductible under Section 80E with no upper limit." });
    }
    if (deductionData.section80G === 0) {
      msgs.push({ sender: 'bot', text: "Consider making donations to approved charitable organizations under Section 80G for tax deductions ranging from 50% to 100% of the donated amount." });
    }
    if (deductionData.section80TTA < 10000) {
      msgs.push({ sender: 'bot', text: "Interest earned on savings accounts is deductible up to ₹10,000 under Section 80TTA." });
    }
    return msgs;
  }

  // Format tax details
  function formatTaxDetails(data) {
    if (!data) return '';
    const { incomeData, deductionData } = data;
    return [
      `Salary Income: ₹${incomeData.salaryIncome}`,
      `Business/Professional Income: ₹${incomeData.otherIncome}`,
      `Rental Income: ₹${incomeData.rentalIncome}`,
      `Capital Gains: ₹${incomeData.capitalGains}`,
      `Other Income: ₹${incomeData.otherIncome}`,
      `Section 80C: ₹${deductionData.section80C}`,
      `Section 80D: ₹${deductionData.section80D}`,
      `Section 80E: ₹${deductionData.section80E}`,
      `Section 80G: ₹${deductionData.section80G}`,
      `Section 80TTA: ₹${deductionData.section80TTA}`,
      `Section 24(b): ₹${deductionData.section24}`,
      `Standard Deduction: ₹${incomeData.salaryIncome > 0 ? 50000 : 0}`,
    ].join('\n');
  }

  // Deduction info
  function getDeductionInfo(option, data) {
    if (!data) return '';
    const { deductionData } = data;
    switch (option) {
      case 'Section 80C':
        return `Section 80C allows you to claim up to ₹1.5 lakh in deductions for investments and expenses such as PPF, ELSS, NSC, life insurance premiums, home loan principal repayment, and tuition fees for children. You have currently claimed ₹${deductionData.section80C} under this section.`;
      case 'Section 80D':
        return `Section 80D allows deduction for health insurance premiums paid for self, family, and parents. You have claimed ₹${deductionData.section80D}.`;
      case 'Section 80E':
        return `Section 80E allows deduction for interest paid on education loans. You have claimed ₹${deductionData.section80E}.`;
      case 'Section 80G':
        return `Section 80G allows deduction for donations to approved charitable institutions. You have claimed ₹${deductionData.section80G}.`;
      case 'Section 80TTA':
        return `Section 80TTA allows deduction up to ₹10,000 on interest from savings accounts. You have claimed ₹${deductionData.section80TTA}.`;
      case 'Section 24(b)':
        return `Section 24(b) allows deduction up to ₹2 lakh on interest paid on home loans. You have claimed ₹${deductionData.section24}.`;
      case 'Standard Deduction':
        return `Standard deduction of ₹50,000 is available for salaried individuals.`;
      default:
        return '';
    }
  }

  // More details info
  function getMoreDetails(option) {
    switch (option) {
      case 'Salary Tax Optimization':
        return 'For salaried individuals, consider restructuring your salary to include HRA, LTA, and meal allowances, which have tax benefits. Also, opt for NPS contributions from your employer for additional tax benefits under Section 80CCD(2).';
      case 'Investment Options':
        return 'Best tax-saving investment options include ELSS (Equity Linked Saving Scheme), PPF (Public Provident Fund), NPS (National Pension System), and Sukanya Samriddhi Yojana for girl children.';
      case 'Home Loan Benefits':
        return 'Home loan tax benefits include principal repayment up to ₹1.5 lakh under Section 80C, interest payment up to ₹2 lakh under Section 24(b), and additional deduction under Section 80EEA for first-time homebuyers.';
      case 'Health Insurance Benefits':
        return 'Health insurance tax benefits include up to ₹25,000 for self and family, and an additional ₹25,000–₹50,000 for parents, under Section 80D.';
      default:
        return 'Thank you for using the Tax Saving Advisor!';
    }
  }

  // Render options
  function renderOptions() {
    if (step === 0) {
      return mainOptions.map(opt => (
        <button key={opt.value} className="chatbot-option" onClick={() => handleOption(opt.label)}>{opt.label}</button>
      ));
    }
    if (step === 1) {
      return (
        <>
          {deductionOptions.map(opt => (
            <button key={opt} className="chatbot-option" onClick={() => handleOption(opt)}>{opt}</button>
          ))}
          <button
            className="chatbot-option"
            onClick={() => {
              setStep(0);
            }}
          >
            Go back
          </button>
        </>
      );
    }
    if (step === 2) {
      return (
        <>
          {moreDetailsOptions.map(opt => (
            <button key={opt} className="chatbot-option" onClick={() => handleOption(opt)}>{opt}</button>
          ))}
          <button
            className="chatbot-option"
            onClick={() => {
              setStep(0);
            }}
          >
            Go back
          </button>
        </>
      );
    }
    return null;
  }

  if (!visible) return null;

  return (
    <div className="chatbot-float-container">
      {!open && (
        <button
          className="chatbot-float-btn"
          aria-label="Open chatbot"
          onClick={() => setOpen(true)}
        >
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <circle cx="18" cy="18" r="18" fill="#2563eb"/>
            <path d="M12 24v-2a4 4 0 014-4h4a4 4 0 014 4v2" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="15" cy="16" r="1" fill="#fff"/>
            <circle cx="21" cy="16" r="1" fill="#fff"/>
          </svg>
        </button>
      )}
      {open && (
        <div className="chatbot-floating">
          <div className="chatbot-header">
            Tax Advisory Chatbot
            <button className="chatbot-close-btn" aria-label="Close chatbot" onClick={() => setOpen(false)}>×</button>
          </div>
          <div className="chatbot-body">
            {loading ? (
              <div>Loading...</div>
            ) : (
              messages.map((msg, idx) => (
                <div key={idx} className={`chatbot-msg ${msg.sender}`}>{msg.text}</div>
              ))
            )}
          </div>
          <div className="chatbot-options">{!loading && renderOptions()}</div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;