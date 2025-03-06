import {
  Button,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Box,
} from "@mui/material";

export const WelcomePage = () => {
  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h1" color="primary" gutterBottom>
        Welcome to the Chess Hub
      </Typography>
      <Typography variant="h5" gutterBottom style={{ marginBottom: "30px" }}>
        Join chess tournaments, find chess professors, and improve your skills.
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={4}>
          <Card sx={{ maxWidth: 345, boxShadow: 3 }}>
            <CardMedia
              image="/images/professor.png"
              title="Find Professors"
              sx={{ height: 200 }}
            />
            <CardContent>
              <Typography variant="h6" color="primary">
                Find Chess Professors
              </Typography>
              <Typography
                variant="body2"
                paragraph
                style={{ marginBottom: "20px" }}
              >
                Discover top chess professors and start your learning journey
                with personalized lessons.
              </Typography>
              <Box display="flex" justifyContent="center">
                <Button
                  href="/professors"
                  variant="contained"
                  color="secondary"
                >
                  Explore Professors
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{ maxWidth: 345, boxShadow: 3 }}>
            <CardMedia
              image="/images/game.png"
              title="Chess Games"
              sx={{ height: 200 }}
            />
            <CardContent>
              <Typography variant="h6" color="primary">
                Chess Games
              </Typography>
              <Typography
                variant="body2"
                paragraph
                style={{ marginBottom: "20px" }}
              >
                Check out the latest chess games and challenges. Improve your
                skills by analyzing live games.
              </Typography>
              <Box display="flex" justifyContent="center">
                <Button href="/games" variant="contained" color="secondary">
                  Explore Games
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{ maxWidth: 345, boxShadow: 3 }}>
            <CardMedia
              image="/images/tournament.png"
              title="Join Tournaments"
              sx={{ height: 200 }}
            />
            <CardContent>
              <Typography variant="h6" color="primary">
                Join Tournaments
              </Typography>
              <Typography
                variant="body2"
                paragraph
                style={{ marginBottom: "20px" }}
              >
                Sign up for exciting tournaments and compete with players
                worldwide. Show your skills!
              </Typography>
              <Box display="flex" justifyContent="center">
                <Button
                  href="/tournaments"
                  variant="contained"
                  color="secondary"
                >
                  Join Now
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};
