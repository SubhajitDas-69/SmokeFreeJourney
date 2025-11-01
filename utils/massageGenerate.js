function genMessage(intake, healthProblems) {
    let message = '';

     if (intake === 0) {
        message = `
            <p>As your intake/day is <strong>${intake}</strong>, you are classified as a <strong>Non-Smoker</strong> 🟢.</p>

            <h3>🎉 Congratulations on Staying Smoke-Free!</h3>
            <p>You're doing an amazing job keeping your lungs clean and your body healthy. Here’s how you can continue to strengthen your health and avoid relapse:</p>

            <h3>💪 Tips to Stay Smoke-Free:</h3>
            <ul>
                <li>🧘 <strong>Practice stress management</strong>: meditation, deep breathing, or yoga.</li>
                <li>🚶‍♂️ <strong>Stay active</strong>: regular walks or workouts to keep your mind off cravings.</li>
                <li>🍎 <strong>Eat healthy</strong>: include fruits, veggies, and high-antioxidant foods.</li>
                <li>💧 <strong>Hydrate</strong>: flush out residual toxins by drinking enough water.</li>
                <li>🤝 <strong>Stay connected</strong>: join support groups or share your story to inspire others.</li>
            </ul>

            <p>🌟 Keep celebrating your progress — every smoke-free day adds years to your life and strength to your willpower!</p>
        `;
    }

    else if (intake <= 5) {
        message = `
            <p>As your intake/day is <strong>${intake}</strong>, you are classified as a <strong>Mild Smoker</strong>.</p>

            <h3>🩺 Remedies for Lung Cleansing & Better Health:</h3>
            <ul>
                <li>💧 <strong>Hydration</strong>: Drink 2.5–3L water/day to flush out toxins.</li>
                <li>🍵 <strong>Herbal Teas</strong>: Ginger, turmeric, or peppermint tea for antioxidants.</li>
                <li>🧘 <strong>Physical Activity</strong>: Brisk walking or yoga boosts lung function.</li>
                <li>🌫️ <strong>Steam Inhalation</strong> (2–3x/week): Add eucalyptus oil to clear airways.</li>
            </ul>

            <h3>🥗 Foods That Heal:</h3>
            <ul>
                <li>🍊 Citrus fruits (Vitamin C)</li>
                <li>🥕 Carrots (Beta-carotene)</li>
                <li>🧄 Garlic</li>
                <li>🌿 Ginger</li>
            </ul>
        `;
    } else if (intake <= 15) {
        message = `
            <p>As your intake/day is <strong>${intake}</strong>, you are classified as a <strong>Moderate Smoker</strong>.</p>

            <h3>🩺 Remedies for Lung Cleansing & Better Health:</h3>
            <ul>
                <li>💧 <strong>Hydration</strong>: Drink 2.5–3L water/day to flush out toxins.</li>
                <li>🍵 <strong>Herbal Teas</strong>: Ginger, turmeric, or peppermint tea for antioxidants.</li>
                <li>🧘 <strong>Physical Activity</strong>: Brisk walking or yoga boosts lung function.</li>
                <li>🌫️ <strong>Steam Inhalation</strong> (2–3x/week): Add eucalyptus oil to clear airways.</li>
                <li>🍃 Mullein tea to reduce mucus.</li>
                <li>🧃 Detox smoothie: spinach + ginger + lemon + honey + green apple.</li>
                <li>🚴‍♂️ Daily cardio (15–30 mins) to improve oxygen use.</li>
                <li>❌ Avoid fried food and dairy to reduce mucus.</li>
            </ul>
        `;
    } else {
        message = `
            <p>As your intake/day is <strong>${intake}</strong>, you are classified as a <strong>Heavy Smoker</strong>.</p>

            <h3>🩺 Remedies for Lung Cleansing & Better Health:</h3>
            <ul>
                <li>💧 <strong>Hydration</strong>: Drink 2.5–3L water/day to flush out toxins.</li>
                <li>🍵 <strong>Herbal Teas</strong>: Ginger, turmeric, or peppermint tea for antioxidants.</li>
                <li>🧘 <strong>Physical Activity</strong>: Brisk walking or yoga boosts lung function.</li>
                <li>🌫️ <strong>Steam Inhalation</strong> (2–3x/week): Add eucalyptus oil to clear airways.</li>
                <li>🍃 Mullein tea to reduce mucus.</li>
                <li>🧃 Detox smoothie: spinach + ginger + lemon + honey + green apple.</li>
                <li>🚴‍♂️ Daily cardio (15–30 mins) to improve oxygen use.</li>
                <li>❌ Avoid fried food and dairy to reduce mucus.</li>
                <li>⚠️ Visit a doctor for lung tests every 6 months.</li>
                <li>🩸 Consider Vitamin C & Omega-3 supplements.</li>
                <li>🧘 Intermittent fasting and regular exercise.</li>
                <li>🚫 Avoid second-hand smoke, alcohol, and pollution.</li>
            </ul>
            <p><strong>📌 Tip:</strong> Seek professional quitting support (therapy, medication, etc.).</p>`;
    }
    if (healthProblems === "Yes") {
        message += `
            <h3 style="color:red;">⚠️ Note: You reported health issues. Please consult a doctor immediately for personalized medical attention.</h3>`;
    }

    return message;
}

module.exports = genMessage;
