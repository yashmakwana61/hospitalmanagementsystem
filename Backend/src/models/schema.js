const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  tenant: { type: String, required: true, index: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['admin', 'doctor', 'nurse', 'receptionist', 'pharmacist', 'lab_technician'],
    required: true 
  },
  department: { type: String },
  specialization: { type: String },
  active: { type: Boolean, default: true }
}, { timestamps: true });

const patientSchema = new mongoose.Schema({
  tenant: { type: String, required: true, index: true },
  patientId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, enum: ['male', 'female', 'other'] },
  contactNumber: { type: String, required: true },
  email: { type: String },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String
  },
  bloodGroup: String,
  allergies: [String],
  medicalHistory: [{
    condition: String,
    diagnosedDate: Date,
    notes: String
  }]
}, { timestamps: true });

const appointmentSchema = new mongoose.Schema({
  tenant: { type: String, required: true, index: true },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  appointmentDate: { type: Date, required: true },
  type: { type: String, enum: ['consultation', 'followup', 'emergency'] },
  status: { 
    type: String, 
    enum: ['scheduled', 'completed', 'cancelled', 'no-show'],
    default: 'scheduled'
  },
  notes: String,
  isOnline: { type: Boolean, default: false }
}, { timestamps: true });

const prescriptionSchema = new mongoose.Schema({
  tenant: { type: String, required: true, index: true },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  appointment: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' },
  diagnosis: String,
  medications: [{
    name: String,
    dosage: String,
    frequency: String,
    duration: String,
    notes: String
  }],
  labTests: [{
    testName: String,
    instructions: String
  }],
  notes: String,
  status: { 
    type: String,
    enum: ['active', 'completed', 'cancelled'],
    default: 'active'
  }
}, { timestamps: true });

module.exports = {
  User: mongoose.model('User', userSchema),
  Patient: mongoose.model('Patient', patientSchema),
  Appointment: mongoose.model('Appointment', appointmentSchema),
  Prescription: mongoose.model('Prescription', prescriptionSchema)
};