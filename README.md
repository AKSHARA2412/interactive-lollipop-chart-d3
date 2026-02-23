Project Title: Interactive Employment Trends Visualization

Project Overview:

This project visualizes gender-based employment trends across multiple countries from 1991 to 2022.

It presents a dynamic lollipop chart comparing male and female employment rates over time.

The goal is to highlight long-term employment patterns and differences between genders in a clear and interactive format.

Data Description:

The visualization uses two CSV datasets containing annual employment rates for males and females.

Each dataset includes multiple countries with yearly employment rate values from 1991 to 2022.

Data is structured in tabular format and processed for numerical and time-based scaling.

Visualization Design and Techniques:

A lollipop chart is used to represent employment rates instead of traditional bars.

Each year displays two offset lollipops: one for male and one for female employment rate.

The x-axis represents time (1991–2022) using a time scale.

The y-axis represents employment rate using a linear scale.

A legend clearly distinguishes male and female values.

Axis labels enhance readability and interpretation.

Interactive Features:

A dropdown menu allows users to select different countries.

The chart updates dynamically based on the selected country.

Data is loaded once and reused for efficient updates.

(Optional) Smooth transitions animate lollipop and axis updates during changes.

Technical Highlights:

Built using D3.js v7.

Implements scale functions (time and linear), domain/range configuration, and axis generation.

Uses SVG elements (lines and circles) to construct the lollipop visualization.

Applies dynamic data filtering and updates based on user interaction.

Key Insights:

Enables side-by-side comparison of male and female employment trends.

Highlights temporal patterns and gender gaps over a 30+ year period.

Demonstrates effective use of alternative chart forms for comparative time-series data.
