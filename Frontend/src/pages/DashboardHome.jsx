import { Box, Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material";

export default function DashboardHome() {
  return (
    <>
      <Typography variant="h5" sx={{marginLeft:'150px'}}>Dashboard</Typography>

    <Box>
  <Grid container spacing={2}>
    
    <Grid size={{lg: 4, md: 6, xs:12, sm: 6}}>
      <Card sx={{ maxWidth: 345, m: 2 }}>
        <CardContent>
          <Typography variant="h5">Language</Typography>
        </CardContent>
        <CardActions>
          <Button>View</Button>
        </CardActions>
      </Card>
    </Grid>

    <Grid size={{lg: 4, md: 6, xs:12, sm: 6}}>
      <Card sx={{ maxWidth: 345, m: 2 }}>
        <CardContent>
          <Typography variant="h5">Topic</Typography>
        </CardContent>
        <CardActions>
          <Button>View</Button>
        </CardActions>
      </Card>
    </Grid>

    <Grid size={{lg: 4, md: 6, xs:12, sm: 6}}>
      <Card sx={{ maxWidth: 345, m: 2 }}>
        <CardContent>
          <Typography variant="h5">Question</Typography>
        </CardContent>
        <CardActions>
          <Button>View</Button>
        </CardActions>
      </Card>
    </Grid>

  </Grid>
</Box>
    </>
  )
}