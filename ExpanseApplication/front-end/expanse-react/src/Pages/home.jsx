import React from 'react';
import TotalBalanceComponent from '../components/totalBalance';
import TotalExpenseComponent from '../components/TotalExpense';
import TotalIncomeComponent from '../components/TotalIncome';
import TotalSavingComponent from '../components/TotalSavings';
import TransactionsTable from '../components/Transactions';
import ActivityComponent from '../components/categoryExpensePie';
import LeaderboardComponent from '../components/leaderboard';
import ChartsComponent from '../components/charts';
import Grid from '@mui/material/Unstable_Grid2';
import SavingGoals from '../components/Savinggoals';
import Sidebar from '../components/Sidebar';
import Layout from '../components/Layout';



function HomeDashboard() {

  
    return (
      <Grid container rowSpacing={8} spacing={2} style={{left: '7%', top: '5%', position: 'absolute'}}>
        <Grid item xs={12} sm={4} md={3}>
        <TotalBalanceComponent />
        </Grid>
        <Grid item xs={12} sm={4} md={3}>
        <TotalExpenseComponent />
        </Grid>
        <Grid item xs={12} sm={4} md={3}>
        <TotalIncomeComponent />
        </Grid>
        <Grid item xs={12} sm={4} md={3}>
        <TotalSavingComponent />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
        <TransactionsTable />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
        <ActivityComponent />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
        <LeaderboardComponent/>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
        <ChartsComponent/>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
        <SavingGoals/>
        </Grid>
      </Grid>
    );
  }
  
  export default HomeDashboard;