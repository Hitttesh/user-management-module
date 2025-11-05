import React, { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Divider from '@mui/material/Divider'
import axios from 'axios'
import UserForm from './components/UserForm'
import UsersTable from './components/UsersTable'

const API = import.meta.env.VITE_API_BASE || 'http://127.0.0.1:8000/api'

export default function App() {
  const [users, setUsers] = useState([])

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API}/users`)
      setUsers(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => { fetchUsers() }, [])

  const handleUserAdded = () => fetchUsers()

  const total = users.length
  const active = users.filter(u => u.status === 'Active').length
  const inactive = total - active

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" mb={2}>User Management</Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Add User</Typography>
            <Divider sx={{ my: 1 }} />
            <UserForm onSuccess={handleUserAdded} />
          </Paper>
          <Paper sx={{ p: 2, mt: 2 }}>
            <Typography variant="subtitle1">Dashboard</Typography>
            <Box display="flex" justifyContent="space-between" mt={1}>
              <Box>
                <Typography variant="body2">Total</Typography>
                <Typography variant="h6">{total}</Typography>
              </Box>
              <Box>
                <Typography variant="body2">Active</Typography>
                <Typography variant="h6">{active}</Typography>
              </Box>
              <Box>
                <Typography variant="body2">Inactive</Typography>
                <Typography variant="h6">{inactive}</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Users</Typography>
            <Divider sx={{ my: 1 }} />
            <UsersTable users={users} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}
