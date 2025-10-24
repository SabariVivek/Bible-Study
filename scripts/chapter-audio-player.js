/**
 * CHAPTER AUDIO PLAYER
 * Exact copy of book audio player, modified for chapters
 */

// Format book name for file paths
function formatBookNameForAudio(bookName) {
    return bookName.toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
}

// Check if chapter audio exists
function checkChapterAudioExists(bookName, chapterNum) {
    return new Promise((resolve) => {
        const formattedBookName = formatBookNameForAudio(bookName);
        const paths = [
            `resources/audio/chapters-old/${formattedBookName}/${formattedBookName}-chapter-${chapterNum}.mp3`,
            `resources/audio/chapters-new/${formattedBookName}/${formattedBookName}-chapter-${chapterNum}.mp3`
        ];
        
        let checkedPaths = 0;
        const totalPaths = paths.length;
        
        const checkPath = (path) => {
            const audio = new Audio();
            let resolved = false;
            
            const onCanPlay = () => {
                if (resolved) return;
                resolved = true;
                cleanup();
                resolve({ exists: true, path: path });
            };
            
            const onError = () => {
                if (resolved) return;
                resolved = true;
                cleanup();
                checkedPaths++;
                
                if (checkedPaths >= totalPaths) {
                    resolve({ exists: false, path: null });
                }
            };
            
            const cleanup = () => {
                audio.removeEventListener('canplaythrough', onCanPlay);
                audio.removeEventListener('error', onError);
                audio.removeEventListener('loadeddata', onCanPlay);
                audio.src = '';
            };
            
            // Set a timeout to prevent hanging
            const timeout = setTimeout(() => {
                if (!resolved) {
                    onError();
                }
            }, 3000); // 3 second timeout
            
            audio.addEventListener('canplaythrough', () => {
                clearTimeout(timeout);
                onCanPlay();
            });
            audio.addEventListener('loadeddata', () => {
                clearTimeout(timeout);
                onCanPlay();
            });
            audio.addEventListener('error', () => {
                clearTimeout(timeout);
                onError();
            });
            
            audio.src = path;
            audio.load();
        };
        
        // Check all paths in parallel for better performance
        paths.forEach(path => checkPath(path));
    });
}

// Update audio icon visibility
async function updateChapterAudioIconVisibility(bookName, chapterNum) {
    const audioBtn = document.querySelector('#book-chapter-content .audio-btn');
    
    if (!audioBtn) {
        console.warn('Chapter audio button not found');
        return;
    }
    
    // Show loading state while checking
    audioBtn.style.display = 'flex';
    audioBtn.style.opacity = '0.5';
    audioBtn.style.pointerEvents = 'none';
    
    const audioCheck = await checkChapterAudioExists(bookName, chapterNum);
    
    if (audioCheck.exists) {
        audioBtn.style.display = 'flex';
        audioBtn.style.opacity = '1';
        audioBtn.style.pointerEvents = 'auto';
        audioBtn.dataset.audioPath = audioCheck.path;
        audioBtn.dataset.bookName = bookName;
        audioBtn.dataset.chapterNum = chapterNum;
    } else {
        audioBtn.style.display = 'none';
        audioBtn.style.opacity = '1';
        audioBtn.style.pointerEvents = 'auto';
    }
}

// Handle click
function handleChapterAudioClick(event) {
    const audioBtn = event.currentTarget;
    const audioPath = audioBtn.dataset.audioPath;
    const bookName = audioBtn.dataset.bookName;
    const chapterNum = audioBtn.dataset.chapterNum;
    
    if (audioPath && bookName && chapterNum) {
        loadChapterAudioPlayer(audioPath, bookName, chapterNum);
    }
}

// Load Chapter Audio Player (EXACT COPY of book player)
function loadChapterAudioPlayer(audioFile, bookName, chapterNum) {
    // Remove any existing player
    const existingPlayer = document.querySelector('.chapter-audio-player-overlay');
    if (existingPlayer) {
        const audio = existingPlayer.querySelector('audio');
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }
        existingPlayer.remove();
    }

    // Create overlay container with embedded player
    const overlay = document.createElement('div');
    overlay.className = 'chapter-audio-player-overlay';
    overlay.innerHTML = `
        <style>
            .chapter-audio-player-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 10000;
                pointer-events: none;
            }
            
            .chapter-audio-player-overlay::before {
                content: '';
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.3);
                backdrop-filter: blur(8px);
                transition: all 0.3s ease;
                z-index: 0;
                pointer-events: auto;
            }

            .chapter-audio-player-overlay.minimized::before {
                background: rgba(0, 0, 0, 0);
                backdrop-filter: blur(0px);
                pointer-events: none;
            }

            .chapter-audio-player-overlay .enhanced-player-body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                background: transparent;
                width: 100%;
                height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                pointer-events: none;
            }

            .chapter-audio-player-overlay .player-container {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                backdrop-filter: blur(10px);
                border-radius: 16px;
                padding: 16px;
                width: 100%;
                position: relative;
                z-index: 1;
                max-width: 320px;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
                border: 1px solid rgba(255, 255, 255, 0.3);
                pointer-events: auto;
            }

            .chapter-audio-player-overlay .player-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 12px;
            }

            .chapter-audio-player-overlay .player-title {
                color: white;
                font-size: 18px;
                font-weight: 700;
                letter-spacing: -0.3px;
                display: flex;
                align-items: center;
                gap: 8px;
            }

            .chapter-audio-player-overlay .playing-indicator {
                display: none;
                width: 20px;
                height: 16px;
                position: relative;
                gap: 2px;
                align-items: flex-end;
            }

            .chapter-audio-player-overlay .player-container.minimized .playing-indicator.active {
                display: flex;
            }

            .chapter-audio-player-overlay .playing-bar {
                width: 3px;
                background: white;
                border-radius: 2px;
                animation: playingAnimation 0.8s ease-in-out infinite;
            }

            .chapter-audio-player-overlay .playing-bar:nth-child(1) {
                height: 8px;
                animation-delay: 0s;
            }

            .chapter-audio-player-overlay .playing-bar:nth-child(2) {
                height: 16px;
                animation-delay: 0.2s;
            }

            .chapter-audio-player-overlay .playing-bar:nth-child(3) {
                height: 8px;
                animation-delay: 0.4s;
            }

            @keyframes playingAnimation {
                0%, 100% {
                    transform: scaleY(0.5);
                }
                50% {
                    transform: scaleY(1);
                }
            }

            .chapter-audio-player-overlay .player-container.minimized {
                max-width: 250px;
            }

            .chapter-audio-player-overlay .player-container.minimized .waveform-container,
            .chapter-audio-player-overlay .player-container.minimized .progress-bar,
            .chapter-audio-player-overlay .player-container.minimized .time-display,
            .chapter-audio-player-overlay .player-container.minimized .controls,
            .chapter-audio-player-overlay .player-container.minimized .bottom-controls {
                display: none;
            }

            .chapter-audio-player-overlay .player-container.minimized .player-header {
                margin-bottom: 0;
            }

            @media screen and (max-width: 1024px) {
                .chapter-audio-player-overlay .player-container {
                    max-width: 300px;
                }
                
                .chapter-audio-player-overlay .player-container.minimized {
                    max-width: 220px;
                    padding: 12px;
                }
            }

            @media screen and (max-width: 768px) {
                .chapter-audio-player-overlay .enhanced-player-body {
                    padding: 15px;
                }
                
                .chapter-audio-player-overlay .player-container {
                    max-width: 280px;
                }
                
                .chapter-audio-player-overlay .player-container.minimized {
                    max-width: 200px;
                    padding: 10px;
                    bottom: 10px !important;
                    right: 10px !important;
                }
                
                .chapter-audio-player-overlay .player-title {
                    font-size: 16px;
                }
            }

            @media screen and (max-width: 480px) {
                .chapter-audio-player-overlay .player-container {
                    max-width: calc(100% - 30px);
                }
                
                .chapter-audio-player-overlay .player-container.minimized {
                    max-width: 180px;
                    padding: 8px;
                    bottom: 8px !important;
                    right: 8px !important;
                }
                
                .chapter-audio-player-overlay .player-title {
                    font-size: 14px;
                }
                
                .chapter-audio-player-overlay .minimize-btn,
                .chapter-audio-player-overlay .close-btn {
                    width: 24px;
                    height: 24px;
                    font-size: 18px;
                }
            }

            .chapter-audio-player-overlay .minimize-btn .minimize-icon {
                display: block;
            }

            .chapter-audio-player-overlay .minimize-btn .maximize-icon {
                display: none;
            }

            .chapter-audio-player-overlay .player-container.minimized .minimize-btn .minimize-icon {
                display: none;
            }

            .chapter-audio-player-overlay .player-container.minimized .minimize-btn .maximize-icon {
                display: block;
            }

            .chapter-audio-player-overlay .header-buttons {
                display: flex;
                gap: 8px;
                align-items: center;
            }

            .chapter-audio-player-overlay .minimize-btn,
            .chapter-audio-player-overlay .close-btn {
                background: rgba(255, 255, 255, 0.2);
                border: none;
                border-radius: 50%;
                width: 28px;
                height: 28px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 0.3s ease;
                color: white;
                font-size: 20px;
            }

            .chapter-audio-player-overlay .minimize-btn:hover,
            .chapter-audio-player-overlay .close-btn:hover {
                background: rgba(255, 255, 255, 0.3);
            }

            .chapter-audio-player-overlay .minimize-btn:hover {
                transform: scale(1.1);
            }

            .chapter-audio-player-overlay .minimize-btn {
                font-size: 24px;
                font-weight: normal;
                line-height: 1;
            }

            .chapter-audio-player-overlay .minimize-btn svg {
                width: 16px;
                height: 16px;
                fill: none;
                stroke: white;
            }

            .chapter-audio-player-overlay .waveform-container {
                background: linear-gradient(135deg, rgba(255, 107, 107, 0.15), rgba(147, 51, 234, 0.15));
                border-radius: 12px;
                padding: 8px 6px;
                margin-bottom: 10px;
                position: relative;
                overflow: hidden;
            }

            .chapter-audio-player-overlay .waveform {
                display: flex;  
                align-items: center;
                justify-content: center;
                height: 24px;
                gap: 2px;
                cursor: pointer;
                position: relative;
                z-index: 1;
                padding: 0 1px;
            }

            .chapter-audio-player-overlay .wave-bar {
                flex: 1;
                background: linear-gradient(180deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.3));
                border-radius: 6px;
                transition: all 0.2s ease;
                min-width: 2px;
                max-width: 4px;
                position: relative;
                cursor: ew-resize;
            }

            .chapter-audio-player-overlay .wave-bar:hover {
                background: linear-gradient(180deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.5));
            }

            .chapter-audio-player-overlay .wave-bar.active {
                background: linear-gradient(180deg, #ff6b6b, #ff8787);
            }

            .chapter-audio-player-overlay .progress-bar {
                width: 100%;
                height: 5px;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 3px;
                margin-bottom: 8px;
                cursor: pointer;
                position: relative;
                overflow: visible;
                transition: height 0.2s ease;
            }

            .chapter-audio-player-overlay .progress-bar:hover {
                height: 6px;
            }

            .chapter-audio-player-overlay .progress-fill {
                height: 100%;
                background: linear-gradient(90deg, #ff6b6b, #ff8787);
                border-radius: 3px;
                width: 0%;
                transition: width 0.1s linear;
                position: relative;
            }

            .chapter-audio-player-overlay .progress-fill::after {
                content: '';
                position: absolute;
                right: -5px;
                top: 50%;
                transform: translateY(-50%);
                width: 10px;
                height: 10px;
                background: white;
                border-radius: 50%;
                opacity: 0;
                transition: opacity 0.2s ease;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            }

            .chapter-audio-player-overlay .progress-bar:hover .progress-fill::after {
                opacity: 1;
            }

            .chapter-audio-player-overlay .time-display {
                display: flex;
                justify-content: space-between;
                color: rgba(255, 255, 255, 0.9);
                font-size: 11px;
                font-weight: 500;
                margin-bottom: 12px;
            }

            .chapter-audio-player-overlay .controls {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 12px;
                margin-bottom: 12px;
            }

            .chapter-audio-player-overlay .control-btn {
                background: rgba(255, 255, 255, 0.9);
                border: none;
                border-radius: 50%;
                width: 36px;
                height: 36px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 0.3s ease;
                font-size: 11px;
                font-weight: 600;
                color: #333;
            }

            .chapter-audio-player-overlay .control-btn:hover {
                background: rgba(255, 255, 255, 1);
                transform: scale(1.05);
            }

            .chapter-audio-player-overlay .control-btn.play {
                width: 48px;
                height: 48px;
                background: linear-gradient(135deg, #ff6b6b, #ff8787);
                box-shadow: 0 4px 12px rgba(255, 107, 107, 0.3);
            }

            .chapter-audio-player-overlay .control-btn.play:hover {
                box-shadow: 0 6px 16px rgba(255, 107, 107, 0.4);
            }

            .chapter-audio-player-overlay .control-btn svg {
                width: 18px;
                height: 18px;
                fill: #333;
            }

            .chapter-audio-player-overlay .control-btn.play svg {
                fill: white;
                width: 20px;
                height: 20px;
            }

            .chapter-audio-player-overlay .bottom-controls {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 12px;
            }

            .chapter-audio-player-overlay .volume-control {
                display: flex;
                align-items: center;
                gap: 8px;
                flex: 1;
            }

            .chapter-audio-player-overlay .volume-icon {
                color: white;
                cursor: pointer;
                transition: all 0.3s ease;
            }

            .chapter-audio-player-overlay .volume-icon:hover {
                transform: scale(1.1);
            }

            .chapter-audio-player-overlay .volume-icon.muted {
                opacity: 0.4;
            }

            .chapter-audio-player-overlay .volume-slider {
                flex: 1;
                height: 3px;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 2px;
                position: relative;
                cursor: pointer;
            }

            .chapter-audio-player-overlay .volume-slider:hover {
                height: 4px;
            }

            .chapter-audio-player-overlay .volume-fill {
                height: 100%;
                background: white;
                border-radius: 2px;
                width: 70%;
                position: relative;
                transition: width 0.1s linear;
            }

            .chapter-audio-player-overlay .volume-fill::after {
                content: '';
                position: absolute;
                right: -5px;
                top: 50%;
                transform: translateY(-50%);
                width: 10px;
                height: 10px;
                background: white;
                border-radius: 50%;
                opacity: 0;
                transition: opacity 0.2s ease;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            }

            .chapter-audio-player-overlay .volume-slider:hover .volume-fill::after {
                opacity: 1;
            }

            .chapter-audio-player-overlay .speed-control {
                background: rgba(255, 255, 255, 0.2);
                border: 1px solid rgba(255, 255, 255, 0.3);
                border-radius: 12px;
                padding: 6px 12px;
                color: white;
                font-size: 11px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
            }

            .chapter-audio-player-overlay .speed-control:hover {
                background: rgba(255, 255, 255, 0.3);
            }
        </style>
        
        <div class="enhanced-player-body">
            <audio id="audioPlayer" src="${audioFile}" preload="metadata" autoplay></audio>
            
            <div class="player-container">
                <div class="player-header">
                    <h2 class="player-title">
                        <span class="playing-indicator" id="playingIndicator">
                            <div class="playing-bar"></div>
                            <div class="playing-bar"></div>
                            <div class="playing-bar"></div>
                        </span>
                        ${bookName} - Ch ${chapterNum}
                    </h2>
                    <div class="header-buttons">
                        <button class="minimize-btn" id="minimizeBtn">
                            <span class="minimize-icon">−</span>
                            <svg class="maximize-icon" viewBox="0 0 24 24">
                                <path d="M4 8V4h4M4 4l5 5M20 8V4h-4M20 4l-5 5M4 16v4h4M4 20l5-5M20 16v4h-4M20 20l-5-5" 
                                      stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/>
                            </svg>
                        </button>
                        <button class="close-btn" id="closeBtn">×</button>
                    </div>
                </div>

                <div class="waveform-container">
                    <div class="waveform" id="waveform"></div>
                </div>

                <div class="progress-bar" id="progressBar">
                    <div class="progress-fill" id="progressFill"></div>
                </div>

                <div class="time-display">
                    <span id="currentTime">0:00</span>
                    <span id="duration">0:00</span>
                </div>

                <div class="controls">
                    <button class="control-btn skip" id="rewind" title="Rewind 3 seconds">-3s</button>
                    <button class="control-btn play" id="playBtn">
                        <svg viewBox="0 0 24 24" id="playIcon">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                        <svg viewBox="0 0 24 24" id="pauseIcon" style="display: none;">
                            <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
                        </svg>
                    </button>
                    <button class="control-btn skip" id="forward" title="Forward 3 seconds">+3s</button>
                </div>

                <div class="bottom-controls">
                    <div class="volume-control">
                        <div class="volume-icon" id="volumeIcon">
                            <svg width="22" height="18" viewBox="0 0 28 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" stroke="none"/>
                                <path d="M14 10.5a1.5 1.5 0 0 1 0 3" class="volume-bar-1" style="opacity: 1;" stroke-linecap="round"/>
                                <path d="M16.5 8.5a4.5 4.5 0 0 1 0 7" class="volume-bar-2" style="opacity: 1;" stroke-linecap="round"/>
                                <path d="M19 6.5a7.5 7.5 0 0 1 0 11" class="volume-bar-3" style="opacity: 1;" stroke-linecap="round"/>
                            </svg>
                            <svg width="22" height="18" viewBox="0 0 28 24" fill="none" stroke="currentColor" stroke-width="2" id="volumeOffIcon" style="display: none;">
                                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" stroke="none"/>
                                <line x1="21" y1="9" x2="15" y2="15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                                <line x1="15" y1="9" x2="21" y2="15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                            </svg>
                        </div>
                        <div class="volume-slider" id="volumeSlider">
                            <div class="volume-fill" id="volumeFill"></div>
                        </div>
                    </div>
                    <button class="speed-control" id="speedBtn">1.0x</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(overlay);
    
    // Initialize the player with JavaScript
    initializeChapterPlayer(overlay);
}

// Initialize the chapter audio player functionality (EXACT COPY of book player)
function initializeChapterPlayer(overlay) {
    const playerContainer = overlay.querySelector('.player-container');
    const waveform = overlay.querySelector('#waveform');
    const audio = overlay.querySelector('#audioPlayer');
    const playBtn = overlay.querySelector('#playBtn');
    const playIcon = overlay.querySelector('#playIcon');
    const pauseIcon = overlay.querySelector('#pauseIcon');
    const playingIndicator = overlay.querySelector('#playingIndicator');
    const progressBar = overlay.querySelector('#progressBar');
    const progressFill = overlay.querySelector('#progressFill');
    const currentTimeSpan = overlay.querySelector('#currentTime');
    const durationSpan = overlay.querySelector('#duration');
    const volumeIcon = overlay.querySelector('#volumeIcon');
    const volumeOffIcon = overlay.querySelector('#volumeOffIcon');
    const volumeSlider = overlay.querySelector('#volumeSlider');
    const volumeFill = overlay.querySelector('#volumeFill');
    const volumeBar1 = overlay.querySelector('.volume-bar-1');
    const volumeBar2 = overlay.querySelector('.volume-bar-2');
    const volumeBar3 = overlay.querySelector('.volume-bar-3');
    const speedBtn = overlay.querySelector('#speedBtn');
    const minimizeBtn = overlay.querySelector('#minimizeBtn');
    const closeBtn = overlay.querySelector('#closeBtn');
    const rewindBtn = overlay.querySelector('#rewind');
    const forwardBtn = overlay.querySelector('#forward');

    // Generate waveform bars
    const bars = 60;
    for (let i = 0; i < bars; i++) {
        const bar = document.createElement('div');
        bar.className = 'wave-bar';
        const height = Math.random() * 70 + 30;
        bar.style.height = height + '%';
        waveform.appendChild(bar);
    }

    // Player state
    let isPlaying = false;
    let currentProgress = 0;
    let speed = 1.0;
    let volume = 70;
    let isMuted = false;
    let previousVolume = 70;
    let isMinimized = false;

    // Set initial volume
    audio.volume = volume / 100;

    // Play/Pause
    playBtn.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
    });

    // Audio event listeners
    audio.addEventListener('play', () => {
        isPlaying = true;
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
        playingIndicator.classList.add('active');
    });

    audio.addEventListener('pause', () => {
        isPlaying = false;
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
        playingIndicator.classList.remove('active');
    });

    audio.addEventListener('loadedmetadata', () => {
        const minutes = Math.floor(audio.duration / 60);
        const seconds = Math.floor(audio.duration % 60);
        durationSpan.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        // Autoplay on load
        audio.play().catch(error => {
        });
    });

    audio.addEventListener('timeupdate', () => {
        if (!audio.duration) return;
        const percent = (audio.currentTime / audio.duration) * 100;
        currentProgress = percent;
        progressFill.style.width = currentProgress + '%';
        updateWaveform(currentProgress);
        
        const minutes = Math.floor(audio.currentTime / 60);
        const seconds = Math.floor(audio.currentTime % 60);
        currentTimeSpan.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    });

    audio.addEventListener('ended', () => {
        isPlaying = false;
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
        playingIndicator.classList.remove('active');
    });

    // Waveform interaction
    let isDraggingWaveform = false;

    waveform.addEventListener('mousedown', (e) => {
        isDraggingWaveform = true;
        seekWaveform(e);
    });

    document.addEventListener('mousemove', (e) => {
        if (isDraggingWaveform) {
            seekWaveform(e);
        }
    });

    document.addEventListener('mouseup', () => {
        isDraggingWaveform = false;
    });

    function seekWaveform(e) {
        const rect = waveform.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
        if (audio.duration) {
            audio.currentTime = (percent / 100) * audio.duration;
        }
    }

    // Progress bar interaction
    let isDraggingProgress = false;

    function updateProgress(e) {
        const rect = progressBar.getBoundingClientRect();
        const percent = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
        if (audio.duration) {
            audio.currentTime = (percent / 100) * audio.duration;
        }
    }

    progressBar.addEventListener('mousedown', (e) => {
        isDraggingProgress = true;
        updateProgress(e);
    });

    document.addEventListener('mousemove', (e) => {
        if (isDraggingProgress) {
            updateProgress(e);
        }
    });

    document.addEventListener('mouseup', () => {
        isDraggingProgress = false;
    });

    progressBar.addEventListener('click', (e) => {
        updateProgress(e);
    });

    // Update waveform active state
    function updateWaveform(percent) {
        const waveBars = waveform.querySelectorAll('.wave-bar');
        const activeIndex = Math.floor((percent / 100) * waveBars.length);
        waveBars.forEach((bar, i) => {
            if (i < activeIndex) {
                bar.classList.add('active');
            } else {
                bar.classList.remove('active');
            }
        });
    }

    // Volume icon functionality
    function updateVolumeIcon(volumeLevel) {
        const normalizedVolume = volumeLevel / 100;
        
        if (volumeLevel === 0 || audio.muted) {
            volumeIcon.querySelector('svg:not(#volumeOffIcon)').style.display = 'none';
            volumeOffIcon.style.display = 'block';
            volumeIcon.classList.add('muted');
        } else {
            volumeIcon.querySelector('svg:not(#volumeOffIcon)').style.display = 'block';
            volumeOffIcon.style.display = 'none';
            volumeIcon.classList.remove('muted');
            
            if (normalizedVolume > 0 && normalizedVolume <= 0.33) {
                volumeBar1.style.opacity = '1';
                volumeBar2.style.opacity = '0';
                volumeBar3.style.opacity = '0';
            } else if (normalizedVolume > 0.33 && normalizedVolume <= 0.66) {
                volumeBar1.style.opacity = '1';
                volumeBar2.style.opacity = '1';
                volumeBar3.style.opacity = '0';
            } else {
                volumeBar1.style.opacity = '1';
                volumeBar2.style.opacity = '1';
                volumeBar3.style.opacity = '1';
            }
        }
    }

    volumeIcon.addEventListener('click', () => {
        isMuted = !isMuted;
        audio.muted = isMuted;

        if (isMuted) {
            previousVolume = volume;
            updateVolumeIcon(0);
        } else {
            volume = previousVolume;
            audio.volume = volume / 100;
            volumeFill.style.width = volume + '%';
            updateVolumeIcon(volume);
        }
    });

    // Speed control
    const speeds = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0];
    let speedIndex = 2;

    speedBtn.addEventListener('click', () => {
        speedIndex = (speedIndex + 1) % speeds.length;
        speed = speeds[speedIndex];
        audio.playbackRate = speed;
        speedBtn.textContent = speed + 'x';
    });

    // Volume control
    let isDraggingVolume = false;

    function updateVolume(e) {
        const rect = volumeSlider.getBoundingClientRect();
        const percent = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
        volume = percent;
        audio.volume = volume / 100;
        volumeFill.style.width = volume + '%';

        if (volume === 0) {
            isMuted = true;
            audio.muted = true;
        } else {
            isMuted = false;
            audio.muted = false;
            previousVolume = volume;
        }
        
        updateVolumeIcon(volume);
    }

    volumeSlider.addEventListener('mousedown', (e) => {
        isDraggingVolume = true;
        updateVolume(e);
    });

    document.addEventListener('mousemove', (e) => {
        if (isDraggingVolume) {
            updateVolume(e);
        }
    });

    document.addEventListener('mouseup', () => {
        isDraggingVolume = false;
    });

    volumeSlider.addEventListener('click', (e) => {
        updateVolume(e);
    });

    // Skip buttons
    rewindBtn.addEventListener('click', () => {
        if (audio.duration) {
            audio.currentTime = Math.max(0, audio.currentTime - 3);
        }
    });

    forwardBtn.addEventListener('click', () => {
        if (audio.duration) {
            audio.currentTime = Math.min(audio.duration, audio.currentTime + 3);
        }
    });

    // Minimize button
    minimizeBtn.addEventListener('click', () => {
        if (!isMinimized) {
            playerContainer.classList.add('minimized');
            overlay.classList.add('minimized');
            playerContainer.style.position = 'fixed';
            // Use responsive positioning based on screen size
            const isMobile = window.innerWidth <= 768;
            const offset = isMobile ? '10px' : '20px';
            playerContainer.style.bottom = offset;
            playerContainer.style.right = offset;
            playerContainer.style.top = 'auto';
            playerContainer.style.left = 'auto';
            isMinimized = true;
        } else {
            playerContainer.classList.remove('minimized');
            overlay.classList.remove('minimized');
            playerContainer.style.position = 'relative';
            playerContainer.style.bottom = 'auto';
            playerContainer.style.right = 'auto';
            isMinimized = false;
        }
    });

    // Click outside to minimize
    overlay.addEventListener('click', (e) => {
        if (!playerContainer.contains(e.target) && !isMinimized) {
            playerContainer.classList.add('minimized');
            overlay.classList.add('minimized');
            playerContainer.style.position = 'fixed';
            // Use responsive positioning based on screen size
            const isMobile = window.innerWidth <= 768;
            const offset = isMobile ? '10px' : '20px';
            playerContainer.style.bottom = offset;
            playerContainer.style.right = offset;
            playerContainer.style.top = 'auto';
            playerContainer.style.left = 'auto';
            isMinimized = true;
        }
    });

    // Close button
    closeBtn.addEventListener('click', () => {
        audio.pause();
        audio.currentTime = 0;
        overlay.style.opacity = '0';
        overlay.style.transition = 'opacity 0.3s ease';
        setTimeout(() => {
            overlay.remove();
        }, 300);
    });

    // ESC key to close
    function handleEscKey(e) {
        if (e.key === 'Escape') {
            audio.pause();
            overlay.remove();
            document.removeEventListener('keydown', handleEscKey);
        }
    }
    document.addEventListener('keydown', handleEscKey);
}

// Export
window.updateChapterAudioIconVisibility = updateChapterAudioIconVisibility;
window.handleChapterAudioClick = handleChapterAudioClick;
