export const calculateDahej = (formData) => {
  // Base scoring system - start from 0
  let totalScore = 0;
  let breakdown = {
    personal: { score: 0, factors: [] },
    professional: { score: 0, factors: [] },
    financial: { score: 0, factors: [] },
    social: { score: 0, factors: [] },
    lifestyle: { score: 0, factors: [] }
  };

  // Age Factor (ENHANCED VALUES)
  const age = parseInt(formData.age) || 25;
  let ageScore = 0;
  if (age < 20) {
    ageScore = 60;
    breakdown.personal.factors.push({ factor: "Very Young", impact: "+60", description: "Too young for marriage!" });
  } else if (age < 25) {
    ageScore = 100;
    breakdown.personal.factors.push({ factor: "Young Age", impact: "+100", description: "Youth premium!" });
  } else if (age < 30) {
    ageScore = 80;
    breakdown.personal.factors.push({ factor: "Perfect Age", impact: "+80", description: "Prime marriage age" });
  } else if (age < 35) {
    ageScore = 40;
    breakdown.personal.factors.push({ factor: "Mature Age", impact: "+40", description: "Stable age" });
  } else if (age < 40) {
    ageScore = -20;
    breakdown.personal.factors.push({ factor: "Older Age", impact: "-20", description: "Age concerns" });
  } else {
    ageScore = -40;
    breakdown.personal.factors.push({ factor: "Very Old", impact: "-40", description: "Significant age penalty" });
  }
  breakdown.personal.score += ageScore;

  // Gender Factor (ENHANCED VALUES)
  let genderScore = 0;
  if (formData.gender === 'male') {
    genderScore = 60;
    breakdown.personal.factors.push({ factor: "Male Gender", impact: "+60", description: "Traditional preference" });
  } else if (formData.gender === 'female') {
    genderScore = 50;
    breakdown.personal.factors.push({ factor: "Female Gender", impact: "+50", description: "Marriage market value" });
  } else {
    genderScore = 30;
    breakdown.personal.factors.push({ factor: "Other Gender", impact: "+30", description: "Progressive mindset" });
  }
  breakdown.personal.score += genderScore;

  // Occupation Score (SIGNIFICANTLY ENHANCED)
  const occupationScores = {
    'doctor': 180,
    'engineer': 150,
    'lawyer': 140,
    'govt-job': 130,
    'business': 120,
    'teacher': 80,
    'artist': 60,
    'labor': -20,
    'farmer': 0,
    'student': 30,
    'unemployed': -60
  };
  
  const occupationScore = occupationScores[formData.occupation] || 0;
  breakdown.professional.score += occupationScore;
  breakdown.professional.factors.push({ 
    factor: "Occupation", 
    impact: occupationScore > 0 ? `+${occupationScore}` : `${occupationScore}`, 
    description: getOccupationDescription(formData.occupation) 
  });

  // Education Score (ENHANCED VALUES)
  const educationScores = {
    'phd': 160,
    'mba': 140,
    'postgraduate': 120,
    'graduate': 100,
    '12th': 40,
    '10th': 20,
    'primary': -20,
    'illiterate': -40
  };
  
  const educationScore = educationScores[formData.education] || 0;
  breakdown.professional.score += educationScore;
  breakdown.professional.factors.push({ 
    factor: "Education", 
    impact: educationScore > 0 ? `+${educationScore}` : `${educationScore}`, 
    description: getEducationDescription(formData.education) 
  });

  // Net Worth Score (DRAMATICALLY ENHANCED)
  const netWorth = parseInt(formData.netWorth) || 0;
  let wealthScore = 0;
  if (netWorth > 50000000) { // 5 Crore+
    wealthScore = 300;
    breakdown.financial.factors.push({ factor: "Ultra Rich", impact: "+300", description: "Multi-crorepati status!" });
  } else if (netWorth > 10000000) { // 1 Crore+
    wealthScore = 200;
    breakdown.financial.factors.push({ factor: "Very Rich", impact: "+200", description: "Crorepati status!" });
  } else if (netWorth > 5000000) { // 50 Lakh+
    wealthScore = 150;
    breakdown.financial.factors.push({ factor: "Rich", impact: "+150", description: "High net worth" });
  } else if (netWorth > 1000000) { // 10 Lakh+
    wealthScore = 80;
    breakdown.financial.factors.push({ factor: "Well-off", impact: "+80", description: "Good savings" });
  } else if (netWorth > 500000) { // 5 Lakh+
    wealthScore = 40;
    breakdown.financial.factors.push({ factor: "Moderate Wealth", impact: "+40", description: "Decent savings" });
  } else if (netWorth > 100000) { // 1 Lakh+
    wealthScore = 20;
    breakdown.financial.factors.push({ factor: "Some Savings", impact: "+20", description: "Basic savings" });
  } else if (netWorth > 0) {
    wealthScore = 10;
    breakdown.financial.factors.push({ factor: "Minimal Savings", impact: "+10", description: "At least something!" });
  } else {
    wealthScore = -20;
    breakdown.financial.factors.push({ factor: "No Savings", impact: "-20", description: "Financial struggle" });
  }
  breakdown.financial.score += wealthScore;

  // Family Background Score (ENHANCED VALUES)
  const familyScores = {
    'royal': 200,
    'political': 160,
    'business': 140,
    'upper-class': 100,
    'middle-class': 50,
    'lower-middle': 20,
    'poor': -30,
    'bpl': -50
  };
  
  const familyScore = familyScores[formData.familyBackground] || 0;
  breakdown.social.score += familyScore;
  breakdown.social.factors.push({ 
    factor: "Family Background", 
    impact: familyScore > 0 ? `+${familyScore}` : `${familyScore}`, 
    description: getFamilyDescription(formData.familyBackground) 
  });

  // Assets Score (ENHANCED VALUES)
  let assetScore = 0;
  if (formData.carOwned === 'yes') {
    assetScore += 40;
    breakdown.lifestyle.factors.push({ factor: "Car Owner", impact: "+40", description: "Mobile lifestyle" });
  } else {
    assetScore -= 10;
    breakdown.lifestyle.factors.push({ factor: "No Car", impact: "-10", description: "Limited mobility" });
  }
  
  if (formData.ownsHouse === 'yes') {
    assetScore += 60;
    breakdown.lifestyle.factors.push({ factor: "House Owner", impact: "+60", description: "Property asset" });
  } else {
    assetScore -= 20;
    breakdown.lifestyle.factors.push({ factor: "No House", impact: "-20", description: "No property" });
  }
  breakdown.lifestyle.score += assetScore;

  // City Score (ENHANCED VALUES)
  const metroCities = ['mumbai', 'delhi', 'bangalore', 'chennai', 'kolkata', 'hyderabad', 'pune', 'ahmedabad'];
  const tier2Cities = ['jaipur', 'lucknow', 'kanpur', 'nagpur', 'indore', 'thane', 'bhopal', 'patna'];
  const city = formData.city.toLowerCase();
  let cityScore = 0;
  
  if (metroCities.some(metro => city.includes(metro))) {
    cityScore = 60;
    breakdown.lifestyle.factors.push({ factor: "Metro City", impact: "+60", description: "Urban lifestyle" });
  } else if (tier2Cities.some(t2 => city.includes(t2))) {
    cityScore = 30;
    breakdown.lifestyle.factors.push({ factor: "Tier 2 City", impact: "+30", description: "Growing urban center" });
  } else if (city.length > 0) {
    cityScore = 15;
    breakdown.lifestyle.factors.push({ factor: "Other City", impact: "+15", description: "City life" });
  } else {
    cityScore = -10;
    breakdown.lifestyle.factors.push({ factor: "No City Info", impact: "-10", description: "Location unknown" });
  }
  breakdown.lifestyle.score += cityScore;

  // Social Media Score (ENHANCED VALUES)
  const following = parseInt(formData.socialFollowing) || 0;
  let socialScore = 0;
  if (following > 1000000) {
    socialScore = 100;
    breakdown.social.factors.push({ factor: "Social Media Celebrity", impact: "+100", description: "Million+ followers!" });
  } else if (following > 100000) {
    socialScore = 60;
    breakdown.social.factors.push({ factor: "Social Media Star", impact: "+60", description: "Influencer status!" });
  } else if (following > 10000) {
    socialScore = 40;
    breakdown.social.factors.push({ factor: "Social Influencer", impact: "+40", description: "Good following" });
  } else if (following > 1000) {
    socialScore = 20;
    breakdown.social.factors.push({ factor: "Social Presence", impact: "+20", description: "Decent following" });
  } else if (following > 0) {
    socialScore = 10;
    breakdown.social.factors.push({ factor: "Social Media User", impact: "+10", description: "Online presence" });
  } else {
    socialScore = -10;
    breakdown.social.factors.push({ factor: "No Social Media", impact: "-10", description: "Limited online presence" });
  }
  breakdown.social.score += socialScore;

  // Skills/Hobbies Score (ENHANCED VALUES)
  const skills = formData.skills.toLowerCase();
  let skillsScore = 0;
  const valuableSkills = ['programming', 'coding', 'cooking', 'singing', 'dancing', 'sports', 'art', 'music', 'writing', 'photography', 'driving'];
  const skillsFound = valuableSkills.filter(skill => skills.includes(skill));
  skillsScore = skillsFound.length * 20; // 20 points per skill
  if (skillsScore > 0) {
    breakdown.personal.factors.push({ 
      factor: "Special Skills", 
      impact: `+${skillsScore}`, 
      description: `Talented in ${skillsFound.join(', ')}` 
    });
  } else if (skills.length === 0) {
    skillsScore = -20;
    breakdown.personal.factors.push({ 
      factor: "No Skills Listed", 
      impact: "-20", 
      description: "No special talents mentioned" 
    });
  }
  breakdown.personal.score += skillsScore;

  // Confidence Score (ENHANCED VALUES)
  const confidence = parseInt(formData.confidenceLevel) || 5;
  let confidenceScore = 0;
  if (confidence >= 9) {
    confidenceScore = 50;
    breakdown.personal.factors.push({ factor: "Very High Confidence", impact: "+50", description: "Very self-assured" });
  } else if (confidence >= 7) {
    confidenceScore = 30;
    breakdown.personal.factors.push({ factor: "High Confidence", impact: "+30", description: "Self-assured personality" });
  } else if (confidence >= 5) {
    confidenceScore = 20;
    breakdown.personal.factors.push({ factor: "Moderate Confidence", impact: "+20", description: "Balanced personality" });
  } else if (confidence >= 3) {
    confidenceScore = 0;
    breakdown.personal.factors.push({ factor: "Low Confidence", impact: "0", description: "Humble nature" });
  } else {
    confidenceScore = -20;
    breakdown.personal.factors.push({ factor: "Very Low Confidence", impact: "-20", description: "Needs confidence boost" });
  }
  breakdown.personal.score += confidenceScore;

  // Calculate total score
  totalScore = breakdown.personal.score + breakdown.professional.score + 
              breakdown.financial.score + breakdown.social.score + breakdown.lifestyle.score;

  // Ensure minimum score is not negative for dahej calculation
  const adjustedScore = Math.max(totalScore, 0);
  
  // MORE REALISTIC dahej calculation with better scaling
  // This formula is designed to be more dynamic and reflect real-world (satirical) valuations.
  let dahejAmount = 0;
  
  if (adjustedScore > 0) {
    // 1. Base amount from score with exponential growth for high achievers
    // Start with a base, add linear growth, and then exponential for top-tier scores.
    let baseAmount = 75000 + (adjustedScore * 1200); 
    baseAmount += 60000 * Math.pow(Math.max(0, adjustedScore - 400) / 100, 2.2); // More aggressive exponential for scores > 400
    
    // 2. Calculate a "Prestige Multiplier" based on key status symbols
    // This simulates how certain combinations are valued more than their parts.
    let prestigeMultiplier = 1.0;
    
    // Professional Prestige (Occupation + Education)
    const isTopProfession = formData.occupation === 'doctor' || formData.occupation === 'engineer';
    const isTopEducation = formData.education === 'phd' || formData.education === 'mba';
    if (isTopProfession && isTopEducation) {
      prestigeMultiplier += 0.8; // Significant bonus for top-tier professional + education
    } else {
      if (formData.occupation === 'doctor') prestigeMultiplier += 0.5;
      if (formData.occupation === 'engineer' || formData.occupation === 'lawyer') prestigeMultiplier += 0.3;
      if (formData.education === 'phd') prestigeMultiplier += 0.4;
      if (formData.education === 'mba') prestigeMultiplier += 0.2;
    }

    // Social Prestige (Family + Location)
    if (formData.familyBackground === 'royal' || formData.familyBackground === 'political') {
       prestigeMultiplier += 0.5;
    } else if (formData.familyBackground === 'business' || formData.familyBackground === 'upper-class') {
       prestigeMultiplier += 0.2;
    }
    if (metroCities.some(metro => city.includes(metro))) prestigeMultiplier += 0.2;

    // Asset Ownership
    if (formData.ownsHouse === 'yes' && formData.carOwned === 'yes') {
      prestigeMultiplier += 0.15; // Bonus for having both major assets
    }

    // Apply the prestige multiplier
    dahejAmount = baseAmount * prestigeMultiplier;

    // 3. Add a direct wealth component for high net worth individuals
    // This has a huge impact, as it does in reality.
    if (netWorth > 50000000) { // Over 5 Crore
      dahejAmount += netWorth * 0.10; // Add 10% of net worth
    } else if (netWorth > 10000000) { // Over 1 Crore
      dahejAmount += netWorth * 0.08; // Add 8% of net worth
    } else if (netWorth > 1000000) { // Over 10 Lakh
      dahejAmount += netWorth * 0.12; // Add 12% of net worth
    }

    // 4. Set realistic caps and floors
    // Cap at a higher value to allow for "whale" candidates
    dahejAmount = Math.min(dahejAmount, 25000000); // Cap at 2.5 Crore
    // Ensure a minimum for any positive score
    dahejAmount = Math.max(dahejAmount, 51000); 

  } else {
    // A token amount for scores at or below zero
    dahejAmount = 25000; 
  }

  // Round to nearest thousand for cleaner numbers
  dahejAmount = Math.round(dahejAmount / 1000) * 1000;
  
  let category = getDahejCategory(totalScore);
  let recommendation = getDahejRecommendation(totalScore);

  return {
    name: formData.name || "Friend",
    totalScore,
    dahejAmount,
    category,
    recommendation,
    breakdown,
    funFacts: generateFunFacts(formData, totalScore),
    comparison: generateComparison(totalScore),
    marketTrends: generateMarketTrends(formData)
  };
};

// Helper functions (updated for better categories)
function getOccupationDescription(occupation) {
  const descriptions = {
    'doctor': 'Life saver = Life changer!',
    'engineer': 'Problem solver extraordinaire',
    'lawyer': 'Justice warrior',
    'govt-job': 'Stable income guaranteed',
    'business': 'Entrepreneurial spirit',
    'teacher': 'Knowledge spreader',
    'artist': 'Creative soul',
    'labor': 'Honest hard work',
    'farmer': 'Feeds the nation',
    'student': 'Future potential',
    'unemployed': 'Exploring opportunities'
  };
  return descriptions[occupation] || 'Unique profession';
}

function getEducationDescription(education) {
  const descriptions = {
    'phd': 'Dr. Saheb level intellect',
    'mba': 'Corporate leadership material',
    'postgraduate': 'Advanced knowledge',
    'graduate': 'Well-educated individual',
    '12th': 'Foundation strong',
    '10th': 'Basic education complete',
    'primary': 'Elementary education',
    'illiterate': 'Life experience over books'
  };
  return descriptions[education] || 'Educational background';
}

function getFamilyDescription(family) {
  const descriptions = {
    'royal': 'Blue blood aristocracy',
    'political': 'Power and influence',
    'business': 'Entrepreneurial legacy',
    'upper-class': 'Elite social circle',
    'middle-class': 'Solid family values',
    'lower-middle': 'Hardworking family',
    'poor': 'Struggling but honest',
    'bpl': 'Below poverty line'
  };
  return descriptions[family] || 'Family heritage';
}

function getDahejCategory(score) {
  if (score >= 600) return { name: "Royal Treatment", emoji: "👑", color: "#FFD700" }; // Gold
  if (score >= 400) return { name: "Premium Package", emoji: "💎", color: "#C4B5FD" }; // Light purple
  if (score >= 300) return { name: "Standard Plus", emoji: "⭐", color: "#93C5FD" }; // Light blue
  if (score >= 200) return { name: "Basic Package", emoji: "📦", color: "#86EFAC" }; // Light green
  if (score >= 100) return { name: "Economy Class", emoji: "🎫", color: "#FDE68A" }; // Light yellow
  return { name: "Discount Sale", emoji: "🏷️", color: "#FCA5A5" }; // Light red
}

function getDahejRecommendation(score) {
  if (score >= 1500) return "Outstanding! You're among the elite top 1% in the marriage market! 🌟";
  if (score >= 100) return "Excellent! You're a highly prized catch in the matrimony circuit! 💎";
  if (score >= 500) return "Very Good! You bring substantial value to the marriage table! ✨";
  if (score >= 300) return "Good potential! Definitely worthy of consideration! 👍";
  if (score >= 100) return "Decent standing. Keep improving your market value! 💪";
  if (score >= 0) return "Room for improvement, but remember - true love sees beyond numbers! ❤️";
  return "Focus on building yourself! Your worth isn't determined by others! 💝";
}

function generateFunFacts(formData, totalScore) {
  const facts = [];
  
  if (parseInt(formData.age) < 25) {
    facts.push("🎂 You're in the 'fresh out of college' category!");
  }
  
  if (formData.occupation === 'doctor') {
    facts.push("👨‍⚕️ Doctors are always in demand - both professionally and matrimonially!");
  }
  
  if (formData.occupation === 'unemployed') {
    facts.push("😅 Unemployment is temporary, but your potential is permanent!");
  }
  
  if (formData.education === 'illiterate') {
    facts.push("📚 Education comes in many forms - life experience counts too!");
  }
  
  if (formData.familyBackground === 'poor' || formData.familyBackground === 'bpl') {
    facts.push("💪 Your family's financial status doesn't define your worth!");
  }
  
  if (parseInt(formData.netWorth) > 1000000) {
    facts.push("💰 Your bank account is impressive!");
  }
  
  if (formData.ownsHouse === 'yes' && formData.carOwned === 'yes') {
    facts.push("🏠🚗 House + Car = Great assets!");
  }
  
  if (parseInt(formData.socialFollowing) > 10000) {
    facts.push("📱 You have a good social media presence!");
  }
  
  if (totalScore > 250) {
    facts.push("🌟 You're in the top tier of marriage market candidates!");
  } else if (totalScore < 50) {
    facts.push("🌱 Everyone starts somewhere! Your value goes beyond these numbers!");
  }
  
  if (facts.length === 0) {
    facts.push("💫 You're unique! That's what makes you special!");
  }
  
  return facts;
}

function generateComparison(score) {
  const comparisons = [
    { item: "A luxury car", value: score > 200 ? "More valuable" : "Less valuable" },
    { item: "A smartphone", value: score > 100 ? "More valuable" : "About the same" },
    { item: "A good meal", value: score > 50 ? "More valuable" : "About the same" },
    { item: "A movie ticket", value: score > 20 ? "More valuable" : "About the same" }
  ];
  
  return comparisons;
}

function generateMarketTrends(formData) {
  // More personalized market trends based on input
  const trends = {
    popularProfessions: ["Doctor", "Engineer", "Government Job"],
    risingTrends: ["Education", "Skills", "Social Media Presence"],
    trendingCities: ["Bangalore", "Mumbai", "Delhi"],
    marketInsight: "The marriage market is changing! Modern families value education, character, and compatibility over traditional factors."
  };
  
  // Add occupation-based insight if available
  if (formData.occupation) {
    const occupationInsights = {
      'doctor': "Medical professionals are seeing a 30% premium in the marriage market!",
      'engineer': "Tech skills are highly valued in today's matrimonial scene.",
      'govt-job': "Government job security is a major plus for many families.",
      'business': "Entrepreneurial spirit is increasingly valued by modern families."
    };
    
    if (occupationInsights[formData.occupation]) {
      trends.marketInsight = occupationInsights[formData.occupation];
    }
  }
  
  return trends;
}