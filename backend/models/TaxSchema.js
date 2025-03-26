import mongoose from 'mongoose';

// User Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Tax Calculation Schema
const taxCalculationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  // Basic Information
  ageGroup: {
    type: String,
    enum: ['below60', 'between60and80', 'above80'],
    required: true
  },
  selectedRegime: {
    type: String,
    enum: ['old', 'new'],
    required: true
  },

  // Income Details
  incomeData: {
    salaryIncome: { type: Number, default: 0 },
    interestIncome: { type: Number, default: 0 },
    rentalIncome: { type: Number, default: 0 },
    capitalGains: { type: Number, default: 0 },
    otherIncome: { type: Number, default: 0 }
  },

  // Deductions (Old Regime)
  deductionData: {
    section80C: { type: Number, default: 0 },
    section80D: { type: Number, default: 0 },
    section24: { type: Number, default: 0 },
    section80CCD: { type: Number, default: 0 },
    section80G: { type: Number, default: 0 },
    section80E: { type: Number, default: 0 },
    section80TTA: { type: Number, default: 0 }
  },

  // Tax Calculation Results
  taxResult: {
    oldRegime: {
      totalIncome: { type: Number, default: 0 },
      deductions: { type: Number, default: 0 },
      taxableIncome: { type: Number, default: 0 },
      tax: { type: Number, default: 0 }
    },
    newRegime: {
      totalIncome: { type: Number, default: 0 },
      deductions: { type: Number, default: 0 },
      taxableIncome: { type: Number, default: 0 },
      tax: { type: Number, default: 0 }
    }
  }
}, {
  timestamps: true
});

// Create compound index for userId and createdAt for efficient querying
taxCalculationSchema.index({ userId: 1, createdAt: -1 });

export const User = mongoose.model('User', userSchema);
export const TaxCalculation = mongoose.model('TaxCalculation', taxCalculationSchema); 