// State Management
const appState = {
    currentView: 'patient',
    patients: [
        // Mock data for initial provider dashboard state
        { id: 'p1', name: 'Alice Smith', symptoms: 'Severe chest pain, shortness of breath, radiating arm pain.', severity: 'critical', timestamp: new Date(Date.now() - 3600000).toISOString() },
        { id: 'p2', name: 'Bob Johnson', symptoms: 'Persistent cough and mild fever for 3 days.', severity: 'routine', timestamp: new Date(Date.now() - 7200000).toISOString() },
        { id: 'p3', name: 'Carol Davis', symptoms: 'High fever 103F, difficulty swallowing, extreme fatigue.', severity: 'urgent', timestamp: new Date(Date.now() - 1800000).toISOString() }
    ]
};

// DOM Elements
const views = {
    patient: document.getElementById('view-patient'),
    provider: document.getElementById('view-provider')
};
const btns = {
    patient: document.getElementById('btn-patient'),
    provider: document.getElementById('btn-provider'),
    submit: document.getElementById('btn-submit'),
    reset: document.getElementById('btn-reset')
};
const form = {
    container: document.querySelector('.form-container'),
    element: document.getElementById('symptom-form'),
    name: document.getElementById('patient-name'),
    symptoms: document.getElementById('symptoms')
};
const analysis = {
    loading: document.getElementById('ai-loading'),
    container: document.getElementById('analysis-result'),
    severity: document.getElementById('result-severity'),
    title: document.getElementById('result-title'),
    desc: document.getElementById('result-desc'),
    action: document.getElementById('result-action')
};

// Event Listeners
document.addEventListener('DOMContentLoaded', initApp);

function initApp() {
    btns.patient.addEventListener('click', () => switchView('patient'));
    btns.provider.addEventListener('click', () => switchView('provider'));
    form.element.addEventListener('submit', handleSymptomSubmit);
    btns.reset.addEventListener('click', resetForm);
    
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            renderDashboard(e.target.dataset.filter);
        });
    });

    renderDashboard();
}

function switchView(viewName) {
    if (appState.currentView === viewName) return;
    
    // Update State
    appState.currentView = viewName;

    // Update Buttons
    btns.patient.classList.toggle('active', viewName === 'patient');
    btns.provider.classList.toggle('active', viewName === 'provider');

    // Update Views with Animation
    Object.values(views).forEach(v => {
        v.classList.remove('active', 'view-fade-in');
        setTimeout(() => v.classList.add('hidden'), 300); // Wait for transition
    });

    setTimeout(() => {
        views[viewName].classList.remove('hidden');
        // Force reflow
        void views[viewName].offsetWidth;
        views[viewName].classList.add('active', 'view-fade-in');
        
        if(viewName === 'provider') renderDashboard();
    }, 300);
}

// AI Mock Logic
function handleSymptomSubmit(e) {
    e.preventDefault();
    const name = form.name.value.trim();
    const symptoms = form.symptoms.value.trim();
    
    if (!name || !symptoms) return;

    // UI Feedback
    form.container.classList.add('hidden');
    analysis.loading.classList.remove('hidden');

    // Simulate Network/Processing latency
    setTimeout(() => {
        analyzeSymptoms(name, symptoms);
    }, 2000);
}

function analyzeSymptoms(name, text) {
    const textLower = text.toLowerCase();
    let severity = 'routine';
    let title = 'Routine Primary Care';
    let desc = 'Based on your symptoms, this does not appear to be an emergency.';
    let action = 'Schedule a regular appointment with your primary care physician within the next 2-3 weeks. Rest and stay hydrated.';

    // Keyword based pseudo-AI heuristic
    const criticalKeywords = ['chest pain', 'breathing', 'shortness of breath', 'stroke', 'unconscious', 'suicide', 'blood', 'heart'];
    const urgentKeywords = ['high fever', 'bone', 'broken', 'vomiting', 'severe pain', 'infection', '103', '104'];

    if (criticalKeywords.some(kw => textLower.includes(kw))) {
        severity = 'critical';
        title = 'Immediate Emergency Medical Attention Required';
        desc = 'Your symptoms indicate a potentially life-threatening condition.';
        action = 'Please call emergency services (911) or proceed to the nearest Emergency Room immediately. Do not drive yourself.';
    } else if (urgentKeywords.some(kw => textLower.includes(kw))) {
        severity = 'urgent';
        title = 'Urgent Care Required';
        desc = 'Your symptoms require prompt medical evaluation but may not be immediately life-threatening.';
        action = 'Please visit the nearest Urgent Care facility or schedule a same-day appointment with your provider.';
    }

    // Save to State
    const newPatient = {
        id: `p${Date.now()}`,
        name,
        symptoms: text,
        severity,
        timestamp: new Date().toISOString()
    };
    appState.patients.unshift(newPatient); // Add to top

    // Update UI
    analysis.loading.classList.add('hidden');
    
    // Style Badge
    analysis.severity.className = 'severity-badge';
    analysis.severity.classList.add(`badge-${severity}`);
    analysis.severity.textContent = severity.toUpperCase();
    
    analysis.title.textContent = title;
    analysis.desc.textContent = desc;
    analysis.action.textContent = action;
    
    analysis.container.classList.remove('hidden');
}

function resetForm() {
    form.element.reset();
    analysis.container.classList.add('hidden');
    form.container.classList.remove('hidden');
}

function renderDashboard(filter = 'all') {
    const queueContainer = document.getElementById('patient-queue');
    queueContainer.innerHTML = '';

    // Calculate Stats
    const stats = { critical: 0, urgent: 0, routine: 0 };
    appState.patients.forEach(p => stats[p.severity]++);
    
    document.getElementById('stat-critical').textContent = stats.critical;
    document.getElementById('stat-urgent').textContent = stats.urgent;
    document.getElementById('stat-routine').textContent = stats.routine;

    // Filter & Sort (Critical first, then time)
    let displayPatients = appState.patients;
    if (filter !== 'all') {
        displayPatients = displayPatients.filter(p => p.severity === filter);
    }
    
    // Order mapping
    const severityWeight = { critical: 3, urgent: 2, routine: 1 };
    displayPatients.sort((a, b) => {
        if (severityWeight[a.severity] !== severityWeight[b.severity]) {
            return severityWeight[b.severity] - severityWeight[a.severity];
        }
        return new Date(b.timestamp) - new Date(a.timestamp);
    });

    if (displayPatients.length === 0) {
        queueContainer.innerHTML = '<div class="queue-item" style="justify-content:center; color:var(--clr-text-muted)">No patients in queue for this category.</div>';
        return;
    }

    displayPatients.forEach(p => {
        const timeAgo = Math.floor((new Date() - new Date(p.timestamp)) / 60000);
        const timeStr = timeAgo < 1 ? 'Just now' : `${timeAgo} min ago`;
        
        const el = document.createElement('div');
        el.className = 'queue-item';
        el.innerHTML = `
            <div class="queue-item-info">
                <h3>${p.name}</h3>
                <div class="queue-item-symptoms" title="${p.symptoms}">${p.symptoms}</div>
                <div style="font-size:0.8rem; color:var(--clr-text-muted); margin-top:0.5rem;">
                    <i class="ph ph-clock"></i> ${timeStr}
                </div>
            </div>
            <div class="queue-item-action">
                <span class="severity-badge badge-${p.severity}">${p.severity.toUpperCase()}</span>
                <button class="btn btn-outline" style="margin-left:1rem; padding:0.4rem 1rem;">View Details</button>
            </div>
        `;
        queueContainer.appendChild(el);
    });
}
