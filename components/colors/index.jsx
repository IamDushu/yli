import React from "react";
import PropTypes from "prop-types";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Grid from "@mui/material/Grid";
import colorStyles from "./colors.module.scss";

export const Colors = () => {


  return (
    <>
      <div className={["yliway-colors", colorStyles["yliway-colors"]].join(
        " "
      )}>

        {/* Primary */}
        <Typography variant="h5" component="div" sx={{ fontWeight: 800, marginBottom: 2 }} marginTop={3}>
          Primary Color
        </Typography>
        <Grid container spacing={2} marginBottom={5}>
          <Grid item md={2}>
            <Card className="border card">
              <CardContent>
                <div className={["yliway-bg-area", colorStyles["yliway-bg-area"], colorStyles["p-0-color"]].join(
                  " "
                )}></div>
                <Typography variant="h6" component="div" sx={{ fontWeight: 800 }}>
                  P-0
                </Typography>
                <Chip label="#000000" />
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={2}>
            <Card className="border card">
              <CardContent>
                <div className={["yliway-bg-area", colorStyles["yliway-bg-area"], colorStyles["p-10-color"]].join(
                  " "
                )}></div>
                <Typography variant="h6" component="div" sx={{ fontWeight: 800 }}>
                  P-10
                </Typography>
                <Chip label="#23005c" />
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={2}>
            <Card className="border card">
              <CardContent>
                <div className={["yliway-bg-area", colorStyles["yliway-bg-area"], colorStyles["p-20-color"]].join(
                  " "
                )}></div>
                <Typography variant="h6" component="div" sx={{ fontWeight: 800 }}>
                  P-20
                </Typography>
                <Chip label="#381e72" />
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={2}>
            <Card className="border card">
              <CardContent>
                <div className={["yliway-bg-area", colorStyles["yliway-bg-area"], colorStyles["p-30-color"]].join(
                  " "
                )}></div>
                <Typography variant="h6" component="div" sx={{ fontWeight: 800 }}>
                  P-30
                </Typography>
                <Chip label="#4f378a" />
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={2}>
            <Card className="border card">
              <CardContent>
                <div className={["yliway-bg-area", colorStyles["yliway-bg-area"], colorStyles["p-40-color"]].join(
                  " "
                )}></div>
                <Typography variant="h6" component="div" sx={{ fontWeight: 800 }}>
                  P-40
                </Typography>
                <Chip label="#6750a4" />
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={2}>
            <Card className="border card">
              <CardContent>
                <div className={["yliway-bg-area", colorStyles["yliway-bg-area"], colorStyles["p-50-color"]].join(
                  " "
                )}></div>
                <Typography variant="h6" component="div" sx={{ fontWeight: 800 }}>
                  P-50
                </Typography>
                <Chip label="#8169bf" />
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={2}>
            <Card className="border card">
              <CardContent>
                <div className={["yliway-bg-area", colorStyles["yliway-bg-area"], colorStyles["p-60-color"]].join(
                  " "
                )}></div>
                <Typography variant="h6" component="div" sx={{ fontWeight: 800 }}>
                  P-60
                </Typography>
                <Chip label="#9b82db" />
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={2}>
            <Card className="border card">
              <CardContent>
                <div className={["yliway-bg-area", colorStyles["yliway-bg-area"], colorStyles["p-70-color"]].join(
                  " "
                )}></div>
                <Typography variant="h6" component="div" sx={{ fontWeight: 800 }}>
                  P-70
                </Typography>
                <Chip label="#b69df7" />
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={2}>
            <Card className="border card">
              <CardContent>
                <div className={["yliway-bg-area", colorStyles["yliway-bg-area"], colorStyles["p-80-color"]].join(
                  " "
                )}></div>
                <Typography variant="h6" component="div" sx={{ fontWeight: 800 }}>
                  P-80
                </Typography>
                <Chip label="#d0bcff" />
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={2}>
            <Card className="border card">
              <CardContent>
                <div className={["yliway-bg-area", colorStyles["yliway-bg-area"], colorStyles["p-90-color"]].join(
                  " "
                )}></div>
                <Typography variant="h6" component="div" sx={{ fontWeight: 800 }}>
                  P-90
                </Typography>
                <Chip label="#e9ddff" />
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={2}>
            <Card className="border card">
              <CardContent>
                <div className={["yliway-bg-area", colorStyles["yliway-bg-area"], colorStyles["p-95-color"]].join(
                  " "
                )}></div>
                <Typography variant="h6" component="div" sx={{ fontWeight: 800 }}>
                  P-95
                </Typography>
                <Chip label="#f6edff" />
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={2}>
            <Card className="border card">
              <CardContent>
                <div className={["yliway-bg-area", colorStyles["yliway-bg-area"], colorStyles["p-99-color"]].join(
                  " "
                )}></div>
                <Typography variant="h6" component="div" sx={{ fontWeight: 800 }}>
                  P-99
                </Typography>
                <Chip label="#fffbff" />
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={2}>
            <Card className="border card">
              <CardContent>
                <div className={["yliway-bg-area", colorStyles["yliway-bg-area"], colorStyles["p-100-color"]].join(
                  " "
                )}></div>
                <Typography variant="h6" component="div" sx={{ fontWeight: 800 }}>
                  P-100
                </Typography>
                <Chip label="#ffffff" />
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Secondary */}
        <Typography variant="h5" component="div" sx={{ fontWeight: 800, marginBottom: 2 }}>
          Secondary Color
        </Typography>
        <Grid container spacing={2} marginBottom={5}>
          <Grid item md={2}>
            <Card className="border card">
              <CardContent>
                <div className={["yliway-bg-area", colorStyles["yliway-bg-area"], colorStyles["s-0-color"]].join(
                  " "
                )}></div>
                <Typography variant="h6" component="div" sx={{ fontWeight: 800 }}>
                  S-0
                </Typography>
                <Chip label="#000000" />
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={2}>
            <Card className="border card">
              <CardContent>
                <div className={["yliway-bg-area", colorStyles["yliway-bg-area"], colorStyles["s-10-color"]].join(
                  " "
                )}></div>
                <Typography variant="h6" component="div" sx={{ fontWeight: 800 }}>
                  S-10
                </Typography>
                <Chip label="#001551" />
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={2}>
            <Card className="border card">
              <CardContent>
                <div className={["yliway-bg-area", colorStyles["yliway-bg-area"], colorStyles["s-20-color"]].join(
                  " "
                )}></div>
                <Typography variant="h6" component="div" sx={{ fontWeight: 800 }}>
                  S-20
                </Typography>
                <Chip label="#002780" />
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={2}>
            <Card className="border card">
              <CardContent>
                <div className={["yliway-bg-area", colorStyles["yliway-bg-area"], colorStyles["s-30-color"]].join(
                  " "
                )}></div>
                <Typography variant="h6" component="div" sx={{ fontWeight: 800 }}>
                  S-30
                </Typography>
                <Chip label="#0039B3" />
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={2}>
            <Card className="border card">
              <CardContent>
                <div className={["yliway-bg-area", colorStyles["yliway-bg-area"], colorStyles["s-40-color"]].join(
                  " "
                )}></div>
                <Typography variant="h6" component="div" sx={{ fontWeight: 800 }}>
                  S-40
                </Typography>
                <Chip label="#004DEA" />
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={2}>
            <Card className="border card">
              <CardContent>
                <div className={["yliway-bg-area", colorStyles["yliway-bg-area"], colorStyles["s-50-color"]].join(
                  " "
                )}></div>
                <Typography variant="h6" component="div" sx={{ fontWeight: 800 }}>
                  S-50
                </Typography>
                <Chip label="#3A6AFF" />
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={2}>
            <Card className="border card">
              <CardContent>
                <div className={["yliway-bg-area", colorStyles["yliway-bg-area"], colorStyles["s-60-color"]].join(
                  " "
                )}></div>
                <Typography variant="h6" component="div" sx={{ fontWeight: 800 }}>
                  S-60
                </Typography>
                <Chip label="#6889FF" />
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={2}>
            <Card className="border card">
              <CardContent>
                <div className={["yliway-bg-area", colorStyles["yliway-bg-area"], colorStyles["s-70-color"]].join(
                  " "
                )}></div>
                <Typography variant="h6" component="div" sx={{ fontWeight: 800 }}>
                  S-70
                </Typography>
                <Chip label="#90A7FF" />
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={2}>
            <Card className="border card">
              <CardContent>
                <div className={["yliway-bg-area", colorStyles["yliway-bg-area"], colorStyles["s-80-color"]].join(
                  " "
                )}></div>
                <Typography variant="h6" component="div" sx={{ fontWeight: 800 }}>
                  S-80
                </Typography>
                <Chip label="#B6C4FF" />
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={2}>
            <Card className="border card">
              <CardContent>
                <div className={["yliway-bg-area", colorStyles["yliway-bg-area"], colorStyles["s-90-color"]].join(
                  " "
                )}></div>
                <Typography variant="h6" component="div" sx={{ fontWeight: 800 }}>
                  S-90
                </Typography>
                <Chip label="#DCE1FF" />
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={2}>
            <Card className="border card">
              <CardContent>
                <div className={["yliway-bg-area", colorStyles["yliway-bg-area"], colorStyles["s-95-color"]].join(
                  " "
                )}></div>
                <Typography variant="h6" component="div" sx={{ fontWeight: 800 }}>
                  S-95
                </Typography>
                <Chip label="#EFF0FF" />
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={2}>
            <Card className="border card">
              <CardContent>
                <div className={["yliway-bg-area", colorStyles["yliway-bg-area"], colorStyles["s-99-color"]].join(
                  " "
                )}></div>
                <Typography variant="h6" component="div" sx={{ fontWeight: 800 }}>
                  S-99
                </Typography>
                <Chip label="#FFFBFF" />
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={2}>
            <Card className="border card">
              <CardContent>
                <div className={["yliway-bg-area", colorStyles["yliway-bg-area"], colorStyles["s-100-color"]].join(
                  " "
                )}></div>
                <Typography variant="h6" component="div" sx={{ fontWeight: 800 }}>
                  S-100
                </Typography>
                <Chip label="#ffffff" />
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Tertiary */}
        <Typography variant="h5" component="div" sx={{ fontWeight: 800, marginBottom: 2 }}>
          Tertiary Color
        </Typography>
        <Grid container spacing={2} marginBottom={5}>
          <Grid item md={2}>
            <Card className="border card">
              <CardContent>
                <div className={["yliway-bg-area", colorStyles["yliway-bg-area"], colorStyles["t-0-color"]].join(
                  " "
                )}></div>
                <Typography variant="h6" component="div" sx={{ fontWeight: 800 }}>
                  T-0
                </Typography>
                <Chip label="#000000" />
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={2}>
            <Card className="border card">
              <CardContent>
                <div className={["yliway-bg-area", colorStyles["yliway-bg-area"], colorStyles["t-10-color"]].join(
                  " "
                )}></div>
                <Typography variant="h6" component="div" sx={{ fontWeight: 800 }}>
                  T-10
                </Typography>
                <Chip label="#171E00" />
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={2}>
            <Card className="border card">
              <CardContent>
                <div className={["yliway-bg-area", colorStyles["yliway-bg-area"], colorStyles["t-20-color"]].join(
                  " "
                )}></div>
                <Typography variant="h6" component="div" sx={{ fontWeight: 800 }}>
                  T-20
                </Typography>
                <Chip label="#2A3400" />
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={2}>
            <Card className="border card">
              <CardContent>
                <div className={["yliway-bg-area", colorStyles["yliway-bg-area"], colorStyles["t-30-color"]].join(
                  " "
                )}></div>
                <Typography variant="h6" component="div" sx={{ fontWeight: 800 }}>
                  T-30
                </Typography>
                <Chip label="#3E4C00" />
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={2}>
            <Card className="border card">
              <CardContent>
                <div className={["yliway-bg-area", colorStyles["yliway-bg-area"], colorStyles["t-40-color"]].join(
                  " "
                )}></div>
                <Typography variant="h6" component="div" sx={{ fontWeight: 800 }}>
                  T-40
                </Typography>
                <Chip label="#536500" />
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={2}>
            <Card className="border card">
              <CardContent>
                <div className={["yliway-bg-area", colorStyles["yliway-bg-area"], colorStyles["t-50-color"]].join(
                  " "
                )}></div>
                <Typography variant="h6" component="div" sx={{ fontWeight: 800 }}>
                  T-50
                </Typography>
                <Chip label="#698000" />
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={2}>
            <Card className="border card">
              <CardContent>
                <div className={["yliway-bg-area", colorStyles["yliway-bg-area"], colorStyles["t-60-color"]].join(
                  " "
                )}></div>
                <Typography variant="h6" component="div" sx={{ fontWeight: 800 }}>
                  T-60
                </Typography>
                <Chip label="#809B02" />
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={2}>
            <Card className="border card">
              <CardContent>
                <div className={["yliway-bg-area", colorStyles["yliway-bg-area"], colorStyles["t-70-color"]].join(
                  " "
                )}></div>
                <Typography variant="h6" component="div" sx={{ fontWeight: 800 }}>
                  T-70
                </Typography>
                <Chip label="#9AB729" />
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={2}>
            <Card className="border card">
              <CardContent>
                <div className={["yliway-bg-area", colorStyles["yliway-bg-area"], colorStyles["t-80-color"]].join(
                  " "
                )}></div>
                <Typography variant="h6" component="div" sx={{ fontWeight: 800 }}>
                  T-80
                </Typography>
                <Chip label="#B5D344" />
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={2}>
            <Card className="border card">
              <CardContent>
                <div className={["yliway-bg-area", colorStyles["yliway-bg-area"], colorStyles["t-90-color"]].join(
                  " "
                )}></div>
                <Typography variant="h6" component="div" sx={{ fontWeight: 800 }}>
                  T-90
                </Typography>
                <Chip label="#D1EF5E" />
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={2}>
            <Card className="border card">
              <CardContent>
                <div className={["yliway-bg-area", colorStyles["yliway-bg-area"], colorStyles["t-95-color"]].join(
                  " "
                )}></div>
                <Typography variant="h6" component="div" sx={{ fontWeight: 800 }}>
                  T-95
                </Typography>
                <Chip label="#DFFE6B" />
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={2}>
            <Card className="border card">
              <CardContent>
                <div className={["yliway-bg-area", colorStyles["yliway-bg-area"], colorStyles["t-99-color"]].join(
                  " "
                )}></div>
                <Typography variant="h6" component="div" sx={{ fontWeight: 800 }}>
                  T-99
                </Typography>
                <Chip label="#FBFFE0" />
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={2}>
            <Card className="border card">
              <CardContent>
                <div className={["yliway-bg-area", colorStyles["yliway-bg-area"], colorStyles["t-100-color"]].join(
                  " "
                )}></div>
                <Typography variant="h6" component="div" sx={{ fontWeight: 800 }}>
                  T-100
                </Typography>
                <Chip label="#ffffff" />
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Error */}
        <Typography variant="h5" component="div" sx={{ fontWeight: 800, marginBottom: 2 }}>
          Error Color
        </Typography>
        <Grid container spacing={2} marginBottom={5}>
          <Grid item md={2}>
            <Card className="border card">
              <CardContent>
                <div className={["yliway-bg-area", colorStyles["yliway-bg-area"], colorStyles["e-0-color"]].join(
                  " "
                )}></div>
                <Typography variant="h6" component="div" sx={{ fontWeight: 800 }}>
                  E-0
                </Typography>
                <Chip label="#000000" />
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={2}>
            <Card className="border card">
              <CardContent>
                <div className={["yliway-bg-area", colorStyles["yliway-bg-area"], colorStyles["e-10-color"]].join(
                  " "
                )}></div>
                <Typography variant="h6" component="div" sx={{ fontWeight: 800 }}>
                  E-10
                </Typography>
                <Chip label="#410002" />
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={2}>
            <Card className="border card">
              <CardContent>
                <div className={["yliway-bg-area", colorStyles["yliway-bg-area"], colorStyles["e-20-color"]].join(
                  " "
                )}></div>
                <Typography variant="h6" component="div" sx={{ fontWeight: 800 }}>
                  E-20
                </Typography>
                <Chip label="#690005" />
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={2}>
            <Card className="border card">
              <CardContent>
                <div className={["yliway-bg-area", colorStyles["yliway-bg-area"], colorStyles["e-30-color"]].join(
                  " "
                )}></div>
                <Typography variant="h6" component="div" sx={{ fontWeight: 800 }}>
                  E-30
                </Typography>
                <Chip label="#93000A" />
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={2}>
            <Card className="border card">
              <CardContent>
                <div className={["yliway-bg-area", colorStyles["yliway-bg-area"], colorStyles["e-40-color"]].join(
                  " "
                )}></div>
                <Typography variant="h6" component="div" sx={{ fontWeight: 800 }}>
                  E-40
                </Typography>
                <Chip label="#BA1A1A" />
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={2}>
            <Card className="border card">
              <CardContent>
                <div className={["yliway-bg-area", colorStyles["yliway-bg-area"], colorStyles["e-50-color"]].join(
                  " "
                )}></div>
                <Typography variant="h6" component="div" sx={{ fontWeight: 800 }}>
                  E-50
                </Typography>
                <Chip label="#DE3730" />
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={2}>
            <Card className="border card">
              <CardContent>
                <div className={["yliway-bg-area", colorStyles["yliway-bg-area"], colorStyles["e-60-color"]].join(
                  " "
                )}></div>
                <Typography variant="h6" component="div" sx={{ fontWeight: 800 }}>
                  E-60
                </Typography>
                <Chip label="#FF5449" />
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={2}>
            <Card className="border card">
              <CardContent>
                <div className={["yliway-bg-area", colorStyles["yliway-bg-area"], colorStyles["e-70-color"]].join(
                  " "
                )}></div>
                <Typography variant="h6" component="div" sx={{ fontWeight: 800 }}>
                  E-70
                </Typography>
                <Chip label="#FF897D" />
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={2}>
            <Card className="border card">
              <CardContent>
                <div className={["yliway-bg-area", colorStyles["yliway-bg-area"], colorStyles["e-80-color"]].join(
                  " "
                )}></div>
                <Typography variant="h6" component="div" sx={{ fontWeight: 800 }}>
                  E-80
                </Typography>
                <Chip label="#FFB4AB" />
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={2}>
            <Card className="border card">
              <CardContent>
                <div className={["yliway-bg-area", colorStyles["yliway-bg-area"], colorStyles["e-90-color"]].join(
                  " "
                )}></div>
                <Typography variant="h6" component="div" sx={{ fontWeight: 800 }}>
                  E-90
                </Typography>
                <Chip label="#FFDAD6" />
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={2}>
            <Card className="border card">
              <CardContent>
                <div className={["yliway-bg-area", colorStyles["yliway-bg-area"], colorStyles["e-95-color"]].join(
                  " "
                )}></div>
                <Typography variant="h6" component="div" sx={{ fontWeight: 800 }}>
                  E-95
                </Typography>
                <Chip label="#FFEDEA" />
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={2}>
            <Card className="border card">
              <CardContent>
                <div className={["yliway-bg-area", colorStyles["yliway-bg-area"], colorStyles["e-99-color"]].join(
                  " "
                )}></div>
                <Typography variant="h6" component="div" sx={{ fontWeight: 800 }}>
                  E-99
                </Typography>
                <Chip label="#FFFBFF" />
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={2}>
            <Card className="border card">
              <CardContent>
                <div className={["yliway-bg-area", colorStyles["yliway-bg-area"], colorStyles["e-100-color"]].join(
                  " "
                )}></div>
                <Typography variant="h6" component="div" sx={{ fontWeight: 800 }}>
                  E-100
                </Typography>
                <Chip label="#ffffff" />
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Neutral */}
        <Typography variant="h5" component="div" sx={{ fontWeight: 800, marginBottom: 2 }}>
          Neutral Color
        </Typography>
        <Grid container spacing={2} marginBottom={5}>
          <Grid item md={2}>
            <Card className="border card">
              <CardContent>
                <div className={["yliway-bg-area", colorStyles["yliway-bg-area"], colorStyles["n-0-color"]].join(
                  " "
                )}></div>
                <Typography variant="h6" component="div" sx={{ fontWeight: 800 }}>
                  N-0
                </Typography>
                <Chip label="#000000" />
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={2}>
            <Card className="border card">
              <CardContent>
                <div className={["yliway-bg-area", colorStyles["yliway-bg-area"], colorStyles["n-10-color"]].join(
                  " "
                )}></div>
                <Typography variant="h6" component="div" sx={{ fontWeight: 800 }}>
                  N-10
                </Typography>
                <Chip label="#1C1B1E" />
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={2}>
            <Card className="border card">
              <CardContent>
                <div className={["yliway-bg-area", colorStyles["yliway-bg-area"], colorStyles["n-20-color"]].join(
                  " "
                )}></div>
                <Typography variant="h6" component="div" sx={{ fontWeight: 800 }}>
                  N-20
                </Typography>
                <Chip label="#48464A" />
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={2}>
            <Card className="border card">
              <CardContent>
                <div className={["yliway-bg-area", colorStyles["yliway-bg-area"], colorStyles["n-30-color"]].join(
                  " "
                )}></div>
                <Typography variant="h6" component="div" sx={{ fontWeight: 800 }}>
                  N-30
                </Typography>
                <Chip label="#48464A" />
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={2}>
            <Card className="border card">
              <CardContent>
                <div className={["yliway-bg-area", colorStyles["yliway-bg-area"], colorStyles["n-40-color"]].join(
                  " "
                )}></div>
                <Typography variant="h6" component="div" sx={{ fontWeight: 800 }}>
                  N-40
                </Typography>
                <Chip label="#605D62" />
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={2}>
            <Card className="border card">
              <CardContent>
                <div className={["yliway-bg-area", colorStyles["yliway-bg-area"], colorStyles["n-50-color"]].join(
                  " "
                )}></div>
                <Typography variant="h6" component="div" sx={{ fontWeight: 800 }}>
                  N-50
                </Typography>
                <Chip label="#79767A" />
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={2}>
            <Card className="border card">
              <CardContent>
                <div className={["yliway-bg-area", colorStyles["yliway-bg-area"], colorStyles["n-60-color"]].join(
                  " "
                )}></div>
                <Typography variant="h6" component="div" sx={{ fontWeight: 800 }}>
                  N-60
                </Typography>
                <Chip label="#938F94" />
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={2}>
            <Card className="border card">
              <CardContent>
                <div className={["yliway-bg-area", colorStyles["yliway-bg-area"], colorStyles["n-70-color"]].join(
                  " "
                )}></div>
                <Typography variant="h6" component="div" sx={{ fontWeight: 800 }}>
                  N-70
                </Typography>
                <Chip label="#AEAAAE" />
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={2}>
            <Card className="border card">
              <CardContent>
                <div className={["yliway-bg-area", colorStyles["yliway-bg-area"], colorStyles["n-80-color"]].join(
                  " "
                )}></div>
                <Typography variant="h6" component="div" sx={{ fontWeight: 800 }}>
                  N-80
                </Typography>
                <Chip label="#CAC5CA" />
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={2}>
            <Card className="border card">
              <CardContent>
                <div className={["yliway-bg-area", colorStyles["yliway-bg-area"], colorStyles["n-90-color"]].join(
                  " "
                )}></div>
                <Typography variant="h6" component="div" sx={{ fontWeight: 800 }}>
                  N-90
                </Typography>
                <Chip label="#E6E1E6" />
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={2}>
            <Card className="border card">
              <CardContent>
                <div className={["yliway-bg-area", colorStyles["yliway-bg-area"], colorStyles["n-95-color"]].join(
                  " "
                )}></div>
                <Typography variant="h6" component="div" sx={{ fontWeight: 800 }}>
                  N-95
                </Typography>
                <Chip label="#F4EFF4" />
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={2}>
            <Card className="border card">
              <CardContent>
                <div className={["yliway-bg-area", colorStyles["yliway-bg-area"], colorStyles["n-99-color"]].join(
                  " "
                )}></div>
                <Typography variant="h6" component="div" sx={{ fontWeight: 800 }}>
                  N-99
                </Typography>
                <Chip label="#FFFBFF" />
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={2}>
            <Card className="border card">
              <CardContent>
                <div className={["yliway-bg-area", colorStyles["yliway-bg-area"], colorStyles["n-100-color"]].join(
                  " "
                )}></div>
                <Typography variant="h6" component="div" sx={{ fontWeight: 800 }}>
                  N-100
                </Typography>
                <Chip label="#ffffff" />
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Neutral Variant */}
        <Typography variant="h5" component="div" sx={{ fontWeight: 800, marginBottom: 2 }}>
          Neutral Variant Color
        </Typography>
        <Grid container spacing={2} marginBottom={5}>
          <Grid item md={2}>
            <Card className="border card">
              <CardContent>
                <div className={["yliway-bg-area", colorStyles["yliway-bg-area"], colorStyles["nv-0-color"]].join(
                  " "
                )}></div>
                <Typography variant="h6" component="div" sx={{ fontWeight: 800 }}>
                  NV-0
                </Typography>
                <Chip label="#000000" />
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={2}>
            <Card className="border card">
              <CardContent>
                <div className={["yliway-bg-area", colorStyles["yliway-bg-area"], colorStyles["nv-10-color"]].join(
                  " "
                )}></div>
                <Typography variant="h6" component="div" sx={{ fontWeight: 800 }}>
                  NV-10
                </Typography>
                <Chip label="#1D1A22" />
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={2}>
            <Card className="border card">
              <CardContent>
                <div className={["yliway-bg-area", colorStyles["yliway-bg-area"], colorStyles["nv-20-color"]].join(
                  " "
                )}></div>
                <Typography variant="h6" component="div" sx={{ fontWeight: 800 }}>
                  NV-20
                </Typography>
                <Chip label="#322F37" />
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={2}>
            <Card className="border card">
              <CardContent>
                <div className={["yliway-bg-area", colorStyles["yliway-bg-area"], colorStyles["nv-30-color"]].join(
                  " "
                )}></div>
                <Typography variant="h6" component="div" sx={{ fontWeight: 800 }}>
                  NV-30
                </Typography>
                <Chip label="#49454E" />
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={2}>
            <Card className="border card">
              <CardContent>
                <div className={["yliway-bg-area", colorStyles["yliway-bg-area"], colorStyles["nv-40-color"]].join(
                  " "
                )}></div>
                <Typography variant="h6" component="div" sx={{ fontWeight: 800 }}>
                  NV-40
                </Typography>
                <Chip label="#615D66" />
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={2}>
            <Card className="border card">
              <CardContent>
                <div className={["yliway-bg-area", colorStyles["yliway-bg-area"], colorStyles["nv-50-color"]].join(
                  " "
                )}></div>
                <Typography variant="h6" component="div" sx={{ fontWeight: 800 }}>
                  NV-50
                </Typography>
                <Chip label="#7A757F" />
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={2}>
            <Card className="border card">
              <CardContent>
                <div className={["yliway-bg-area", colorStyles["yliway-bg-area"], colorStyles["nv-60-color"]].join(
                  " "
                )}></div>
                <Typography variant="h6" component="div" sx={{ fontWeight: 800 }}>
                  NV-60
                </Typography>
                <Chip label="#948F99" />
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={2}>
            <Card className="border card">
              <CardContent>
                <div className={["yliway-bg-area", colorStyles["yliway-bg-area"], colorStyles["nv-70-color"]].join(
                  " "
                )}></div>
                <Typography variant="h6" component="div" sx={{ fontWeight: 800 }}>
                  NV-70
                </Typography>
                <Chip label="#AFA9B4" />
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={2}>
            <Card className="border card">
              <CardContent>
                <div className={["yliway-bg-area", colorStyles["yliway-bg-area"], colorStyles["nv-80-color"]].join(
                  " "
                )}></div>
                <Typography variant="h6" component="div" sx={{ fontWeight: 800 }}>
                  NV-80
                </Typography>
                <Chip label="#CAC4CF" />
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={2}>
            <Card className="border card">
              <CardContent>
                <div className={["yliway-bg-area", colorStyles["yliway-bg-area"], colorStyles["nv-90-color"]].join(
                  " "
                )}></div>
                <Typography variant="h6" component="div" sx={{ fontWeight: 800 }}>
                  NV-90
                </Typography>
                <Chip label="#E7E0EB" />
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={2}>
            <Card className="border card">
              <CardContent>
                <div className={["yliway-bg-area", colorStyles["yliway-bg-area"], colorStyles["nv-95-color"]].join(
                  " "
                )}></div>
                <Typography variant="h6" component="div" sx={{ fontWeight: 800 }}>
                  NV-95
                </Typography>
                <Chip label="#F5EEFA" />
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={2}>
            <Card className="border card">
              <CardContent>
                <div className={["yliway-bg-area", colorStyles["yliway-bg-area"], colorStyles["nv-99-color"]].join(
                  " "
                )}></div>
                <Typography variant="h6" component="div" sx={{ fontWeight: 800 }}>
                  NV-99
                </Typography>
                <Chip label="#FFFBFF" />
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={2}>
            <Card className="border card">
              <CardContent>
                <div className={["yliway-bg-area", colorStyles["yliway-bg-area"], colorStyles["nv-100-color"]].join(
                  " "
                )}></div>
                <Typography variant="h6" component="div" sx={{ fontWeight: 800 }}>
                  NV-100
                </Typography>
                <Chip label="#ffffff" />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

Colors.propTypes = {
  ColorsName: PropTypes.string.isRequired,
};
