import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import axios from 'axios'

const API = import.meta.env.VITE_API_BASE || 'http://127.0.0.1:8000/api'

export default function UserForm({ onSuccess }) {
  const [form, setForm] = useState({ full_name: '', mobile_number: '', email: '', status: 'Active' })
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null); setMessage(null)
    try {
      await axios.post(`${API}/users`, form)
      setMessage('User added successfully')
      setForm({ full_name: '', mobile_number: '', email: '', status: 'Active' })
      onSuccess?.()
    } catch (err) {
      setError(err?.response?.data?.detail || 'Error adding user')
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'grid', gap: 1 }}>
      {error && <Alert severity="error">{error}</Alert>}
      {message && <Alert severity="success">{message}</Alert>}
      <TextField label="Full Name" name="full_name" value={form.full_name} onChange={handleChange} required />
      <TextField label="Mobile Number" name="mobile_number" value={form.mobile_number} onChange={handleChange} required />
      <TextField label="Email" name="email" value={form.email} onChange={handleChange} required />
      <TextField select label="Status" name="status" value={form.status} onChange={handleChange}>
        <MenuItem value="Active">Active</MenuItem>
        <MenuItem value="Inactive">Inactive</MenuItem>
      </TextField>
      <Button type="submit" variant="contained">Add User</Button>
    </Box>
  )
}
