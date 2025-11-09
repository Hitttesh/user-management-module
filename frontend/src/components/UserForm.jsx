// import React, { useState } from 'react'
// import TextField from '@mui/material/TextField'
// import Button from '@mui/material/Button'
// import MenuItem from '@mui/material/MenuItem'
// import Box from '@mui/material/Box'
// import Alert from '@mui/material/Alert'
// import axios from 'axios'

// const API = import.meta.env.VITE_API_BASE || 'http://127.0.0.1:8000/api'

// export default function UserForm({ onSuccess }) {
//   const [form, setForm] = useState({ full_name: '', mobile_number: '', email: '', status: 'Active' })
//   const [message, setMessage] = useState(null)
//   const [error, setError] = useState(null)

//   const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setError(null); setMessage(null)
//     try {
//       await axios.post(`${API}/users`, form)
//       setMessage('User added successfully')
//       setForm({ full_name: '', mobile_number: '', email: '', status: 'Active' })
//       onSuccess?.()
//     } catch (err) {
//       setError(err?.response?.data?.detail || 'Error adding user')
//     }
//   }

//   return (
//     <Box component="form" onSubmit={handleSubmit} sx={{ display: 'grid', gap: 1 }}>
//       {error && <Alert severity="error">{error}</Alert>}
//       {message && <Alert severity="success">{message}</Alert>}
//       <TextField label="Full Name" name="full_name" value={form.full_name} onChange={handleChange} required />
//       <TextField
//   label="Mobile Number"
//   name="mobile_number"
//   value={formData.mobile_number}
//   onChange={handleChange}
//   required
//   inputProps={{ maxLength: 10, pattern: "[0-9]{10}" }}
//   helperText="Enter a 10-digit number"
//   error={formData.mobile_number && !/^\d{10}$/.test(formData.mobile_number)}
// />

//       <TextField label="Email" name="email" value={form.email} onChange={handleChange} required />
//       <TextField select label="Status" name="status" value={form.status} onChange={handleChange}>
//         <MenuItem value="Active">Active</MenuItem>
//         <MenuItem value="Inactive">Inactive</MenuItem>
//       </TextField>
//       <Button type="submit" variant="contained">Add User</Button>
//     </Box>
//   )
// }


// src/components/UserForm.jsx
import React, { useState } from 'react'
import { Box, TextField, Button, Stack, Alert } from '@mui/material'
import axios from 'axios'

const API = import.meta.env.VITE_API_BASE || 'http://127.0.0.1:8000/api'

export default function UserForm({ onSuccess }) {
  const [full_name, setFullName] = useState('')
  const [mobile_number, setMobileNumber] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('Active')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const validate = () => {
    if (!full_name.trim()) return 'Full name is required'
    if (!/^\d{10}$/.test(mobile_number)) return 'Mobile number must be exactly 10 digits'
    if (!email.trim()) return 'Email is required'
    // basic email shape (let backend handle definitive validation)
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Invalid email'
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const v = validate()
    if (v) { setError(v); return }
    setLoading(true)
    try {
      const payload = { full_name, mobile_number, email, status }
      const res = await axios.post(`${API}/users`, payload)
      // clear the form
      setFullName('')
      setMobileNumber('')
      setEmail('')
      setStatus('Active')
      if (onSuccess) onSuccess(res.data)
    } catch (err) {
      // prefer backend message when available
      const msg = err?.response?.data?.detail || err?.message || 'Failed to create user'
      setError(String(msg))
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Stack spacing={2}>
        {error && <Alert severity="error">{error}</Alert>}

        <TextField
          label="Full name"
          value={full_name}
          onChange={(e) => setFullName(e.target.value)}
          required
          fullWidth
        />

        <TextField
          label="Mobile number"
          value={mobile_number}
          onChange={(e) => {
            // keep only digits
            const cleaned = e.target.value.replace(/\D/g, '')
            // allow up to 10 digits
            setMobileNumber(cleaned.slice(0, 10))
          }}
          inputMode="numeric"
          placeholder="10 digits"
          required
          fullWidth
        />

        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
        />

        <TextField
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          helperText="Active or Inactive"
          fullWidth
        />

        <Box display="flex" justifyContent="flex-end" mt={1}>
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? 'Adding...' : 'Add User'}
          </Button>
        </Box>
      </Stack>
    </Box>
  )
}
