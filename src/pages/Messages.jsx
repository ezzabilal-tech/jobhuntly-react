import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  LayoutDashboard,
  MessageSquare,
  FileText,
  Building,
  User,
  Settings,
  HelpCircle,
  Pin,
  Star,
  MoreVertical,
  Paperclip,
  Smile,
  Send,
  ChevronDown,
  Users,
  Bell,
  Plus,
  Calendar,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import NotificationPanel from '../components/NotificationPanel';
import './Messages.css';
import './EmployerDashboard.css';

export default function Messages() {
  const { user, logout } = useAuth();
  const dashboardHref = user?.role === 'company' ? '/employer/dashboard' : '/dashboard';
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  // Fallback defaults
  const displayName = user?.name || 'Jake Gyll';
  const displayEmail = user?.email || 'jakegyll@email.com';
  const displayAvatar = user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80';

  // State
  const [activeMenu, setActiveMenu] = useState('messages');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeChatId, setActiveChatId] = useState(1);
  const [inputMessage, setInputMessage] = useState('');

  // Initial Chat Database
  const [chats, setChats] = useState(() => {
    const isCompany = user?.role === 'company';
    if (isCompany) {
      return [
        {
          id: 1,
          name: 'Jan Mayer',
          role: 'Designer Candidate',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
          time: '12 mins ago',
          unread: true,
          messages: [
            {
              id: 'm1',
              sender: 'me',
              text: 'Hey Jan, I wanted to reach out because we saw your work contributions and were impressed by your work.',
              time: '12 mins ago',
            },
            {
              id: 'm2',
              sender: 'me',
              text: 'We want to invite you for a quick interview',
              time: '12 mins ago',
            },
            {
              id: 'm3',
              sender: 'them',
              text: 'Hi Maria, sure I would love to. Thanks for taking the time to see my work!',
              time: '12 mins ago',
            },
          ],
        },
        {
          id: 2,
          name: 'Joe Bartmann',
          role: 'Marketing Candidate',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
          time: '3:40 PM',
          unread: false,
          messages: [
            {
              id: 'm1',
              sender: 'them',
              text: 'Hey thanks for your interview application. We will get back to you soon.',
              time: '3:40 PM',
            },
          ],
        },
        {
          id: 3,
          name: 'Ally Wales',
          role: 'Product Design Candidate',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
          time: '3:40 PM',
          unread: false,
          messages: [
            {
              id: 'm1',
              sender: 'them',
              text: 'Hey thanks for your interview, it was great speaking with you.',
              time: '3:40 PM',
            },
          ],
        },
        {
          id: 4,
          name: 'James Gardner',
          role: 'UI/UX Candidate',
          avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
          time: '3:40 PM',
          unread: false,
          messages: [
            {
              id: 'm1',
              sender: 'them',
              text: 'Hey thanks for your interview application.',
              time: '3:40 PM',
            },
          ],
        },
        {
          id: 5,
          name: 'Allison Geidt',
          role: 'Frontend Candidate',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80',
          time: '3:40 PM',
          unread: false,
          messages: [
            {
              id: 'm1',
              sender: 'them',
              text: 'Hey thanks for your interview, let’s schedule a second round next week.',
              time: '3:40 PM',
            },
          ],
        },
        {
          id: 6,
          name: 'Ruben Culhane',
          role: 'Backend Candidate',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
          time: '3:40 PM',
          unread: false,
          messages: [
            {
              id: 'm1',
              sender: 'them',
              text: 'Hey thanks for your interview application.',
              time: '3:40 PM',
            },
          ],
        },
        {
          id: 7,
          name: 'Lydia Diaz',
          role: 'Data Science Candidate',
          avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
          time: '3:40 PM',
          unread: false,
          messages: [
            {
              id: 'm1',
              sender: 'them',
              text: 'Hey thanks for your interview application.',
              time: '3:40 PM',
            },
          ],
        },
        {
          id: 8,
          name: 'James Dokidis',
          role: 'DevOps Candidate',
          avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
          time: '3:40 PM',
          unread: false,
          messages: [
            {
              id: 'm1',
              sender: 'them',
              text: 'Hey thanks for your interview application.',
              time: '3:40 PM',
            },
          ],
        },
        {
          id: 9,
          name: 'Angelina Swann',
          role: 'Product Manager Candidate',
          avatar: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=150&auto=format&fit=crop&q=80',
          time: '3:40 PM',
          unread: false,
          messages: [
            {
              id: 'm1',
              sender: 'them',
              text: 'Hey thanks for your interview, we will reach out soon.',
              time: '3:40 PM',
            },
          ],
        },
      ];
    } else {
      return [
        {
          id: 1,
          name: 'Jan Mayer',
          role: 'Recruiter at Nomad',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
          time: '12 mins ago',
          unread: true,
          messages: [
            {
              id: 'm1',
              sender: 'them',
              text: 'Hey Jake, I wanted to reach out because we saw your work contributions and were impressed by your work.',
              time: '12 mins ago',
            },
            {
              id: 'm2',
              sender: 'them',
              text: 'We want to invite you for a quick interview',
              time: '12 mins ago',
            },
            {
              id: 'm3',
              sender: 'me',
              text: 'Hi Jan, sure I would love to. Thanks for taking the time to see my work!',
              time: '12 mins ago',
            },
          ],
        },
        {
          id: 2,
          name: 'Joe Bartmann',
          role: 'HR Manager at Divvy',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
          time: '3:40 PM',
          unread: false,
          messages: [
            {
              id: 'm1',
              sender: 'them',
              text: 'Hey thanks for your interview application. We will get back to you soon.',
              time: '3:40 PM',
            },
          ],
        },
        {
          id: 3,
          name: 'Ally Wales',
          role: 'Recruiter at Stripe',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
          time: '3:40 PM',
          unread: false,
          messages: [
            {
              id: 'm1',
              sender: 'them',
              text: 'Hey thanks for your interview, it was great speaking with you.',
              time: '3:40 PM',
            },
          ],
        },
        {
          id: 4,
          name: 'James Gardner',
          role: 'Recruiter at Airbnb',
          avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
          time: '3:40 PM',
          unread: false,
          messages: [
            {
              id: 'm1',
              sender: 'them',
              text: 'Hey thanks for your interview application.',
              time: '3:40 PM',
            },
          ],
        },
        {
          id: 5,
          name: 'Allison Geidt',
          role: 'HR Lead at Spotify',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80',
          time: '3:40 PM',
          unread: false,
          messages: [
            {
              id: 'm1',
              sender: 'them',
              text: 'Hey thanks for your interview, let’s schedule a second round next week.',
              time: '3:40 PM',
            },
          ],
        },
        {
          id: 6,
          name: 'Ruben Culhane',
          role: 'Recruiter at Dropbox',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
          time: '3:40 PM',
          unread: false,
          messages: [
            {
              id: 'm1',
              sender: 'them',
              text: 'Hey thanks for your interview application.',
              time: '3:40 PM',
            },
          ],
        },
        {
          id: 7,
          name: 'Lydia Diaz',
          role: 'HR Manager at Slack',
          avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
          time: '3:40 PM',
          unread: false,
          messages: [
            {
              id: 'm1',
              sender: 'them',
              text: 'Hey thanks for your interview application.',
              time: '3:40 PM',
            },
          ],
        },
        {
          id: 8,
          name: 'James Dokidis',
          role: 'Recruiter at Netflix',
          avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
          time: '3:40 PM',
          unread: false,
          messages: [
            {
              id: 'm1',
              sender: 'them',
              text: 'Hey thanks for your interview application.',
              time: '3:40 PM',
            },
          ],
        },
        {
          id: 9,
          name: 'Angelina Swann',
          role: 'HR Specialist at Figma',
          avatar: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=150&auto=format&fit=crop&q=80',
          time: '3:40 PM',
          unread: false,
          messages: [
            {
              id: 'm1',
              sender: 'them',
              text: 'Hey thanks for your interview, we will reach out soon.',
              time: '3:40 PM',
            },
          ],
        },
      ];
    }
  });

  const activeChat = chats.find((c) => c.id === activeChatId) || chats[0];

  // Scroll to bottom of chat history when active chat changes or messages list updates
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChat.messages]);

  const handleSelectChat = (id) => {
    setActiveChatId(id);
    // Mark as read
    setChats(
      chats.map((c) => (c.id === id ? { ...c, unread: false } : c))
    );
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: `m-new-${Date.now()}`,
      sender: 'me',
      text: inputMessage,
      time: 'Just now',
    };

    setChats(
      chats.map((c) => {
        if (c.id === activeChatId) {
          return {
            ...c,
            time: 'Just now',
            messages: [...c.messages, newMessage],
          };
        }
        return c;
      })
    );

    setInputMessage('');
  };

  const filteredChats = chats.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isCompany = user?.role === 'company';

  const menuItems = isCompany
    ? [
        { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/employer/dashboard' },
        { key: 'messages', label: 'Messages', icon: MessageSquare, badge: 1, href: '/messages' },
        { key: 'company-profile', label: 'Company Profile', icon: Building, href: '/employer/company-profile' },
        { key: 'all-applicants', label: 'All Applicants', icon: Users, href: '/employer/applicants' },
        { key: 'job-listing', label: 'Job Listing', icon: FileText, href: '/employer/job-listing' },
        { key: 'my-schedule', label: 'My Schedule', icon: Calendar, href: '/employer/my-schedule' },
      ]
    : [
        { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: dashboardHref },
        { key: 'messages', label: 'Messages', icon: MessageSquare, badge: 1, href: '/messages' },
        { key: 'applications', label: 'My Applications', icon: FileText, href: '/applications' },
        { key: 'find-jobs', label: 'Find Jobs', icon: Search, href: '/jobs' },
        { key: 'browse-companies', label: 'Browse Companies', icon: Building, href: '/companies' },
        { key: 'profile', label: 'My Public Profile', icon: User, href: '/profile' },
      ];

  const settingItems = [
    { key: 'settings', label: 'Settings', icon: Settings, href: '/settings' },
    { key: 'help', label: 'Help Center', icon: HelpCircle, href: '/help' },
  ];

  return (
    <div className="messages-page">
      {/* Sidebar Navigation */}
      <aside className="messages-sidebar">
        <Link to="/" className="sidebar-logo">
          <span className="sidebar-logo-dot" />
          JobHuntly
        </Link>

        <nav className="sidebar-menu">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.key === 'messages';
            return (
              <Link
                key={item.key}
                to={item.href}
                onClick={(e) => {
                  if (item.href === '#') {
                    e.preventDefault();
                    setActiveMenu(item.key);
                  }
                }}
                className={`sidebar-item ${isActive ? 'sidebar-item--active' : ''}`}
              >
                <div className="sidebar-item-left">
                  <Icon size={18} />
                  <span>{item.label}</span>
                </div>
                {item.badge && <span className="sidebar-badge">{item.badge}</span>}
              </Link>
            );
          })}

          <div className="sidebar-section-title">Settings</div>

          {settingItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.key}
                to={item.href}
                onClick={(e) => {
                  if (item.href === '#') {
                    e.preventDefault();
                    setActiveMenu(item.key);
                  }
                }}
                className={`sidebar-item ${activeMenu === item.key ? 'sidebar-item--active' : ''}`}
              >
                <div className="sidebar-item-left">
                  <Icon size={18} />
                  <span>{item.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Profile Card */}
        <div className="sidebar-profile">
          <img src={displayAvatar} alt={displayName} className="sidebar-profile-avatar" />
          <div className="sidebar-profile-info">
            <span className="sidebar-profile-name">{displayName}</span>
            <span className="sidebar-profile-email" title={displayEmail}>{displayEmail}</span>
          </div>
        </div>
      </aside>

      {/* Main Panel Content */}
      <main className="messages-main">
        {/* Header */}
        <header className="messages-header">
          {isCompany ? (
            <div className="company-selector-dropdown">
              <div className="company-dropdown-logo">N</div>
              <div className="company-dropdown-info">
                <span className="company-dropdown-sub">Company</span>
                <span className="company-dropdown-name">
                  Nomad <ChevronDown size={14} />
                </span>
              </div>
            </div>
          ) : (
            <h1>Messages</h1>
          )}
          <div className="messages-header-right">
            {isCompany ? (
              <button className="btn-post-job-header" onClick={(e) => e.preventDefault()}>
                <Plus size={16} />
                Post a job
              </button>
            ) : (
              <Link to="/" className="btn-back-home">
                Back to homepage
              </Link>
            )}
            <NotificationPanel />
          </div>
        </header>

        {isCompany && (
          <h1 className="messages-title" style={{ fontSize: '24px', fontWeight: 700, color: '#25324b', marginBottom: '24px', marginTop: '12px' }}>
            Messages
          </h1>
        )}

        {/* Chat Workspace split */}
        <div className="chat-layout">
          {/* Left panel: Threads List */}
          <div className="chat-list-panel">
            <div className="chat-search-container">
              <input
                type="text"
                placeholder="Search messages"
                className="chat-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="chat-search-icon" size={18} />
            </div>

            <div className="chat-threads">
              {filteredChats.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => handleSelectChat(chat.id)}
                  className={`chat-thread-item ${
                    activeChatId === chat.id ? 'chat-thread-item--active' : ''
                  }`}
                >
                  <img src={chat.avatar} alt={chat.name} className="chat-thread-avatar" />
                  <div className="chat-thread-details">
                    <div className="chat-thread-top">
                      <span className="chat-thread-name">
                        {chat.name}
                        {chat.unread && <span className="chat-thread-unread-dot" />}
                      </span>
                      <span className="chat-thread-time">{chat.time}</span>
                    </div>
                    <p className="chat-thread-preview">
                      {chat.messages[chat.messages.length - 1]?.text}
                    </p>
                  </div>
                </div>
              ))}
              {filteredChats.length === 0 && (
                <div style={{ textAlign: 'center', padding: '32px', color: '#7c8493', fontSize: '14px' }}>
                  No messages found
                </div>
              )}
            </div>
          </div>

          {/* Right panel: Active Chat Window */}
          <div className="chat-window-panel">
            {/* Top Bar of active chat */}
            <div className="chat-window-header">
              <div className="chat-header-profile">
                <img
                  src={activeChat.avatar}
                  alt={activeChat.name}
                  className="chat-header-avatar"
                />
                <div className="chat-header-name">
                  <h3>{activeChat.name}</h3>
                  <p>{activeChat.role}</p>
                </div>
              </div>
              <div className="chat-header-actions" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button className="chat-action-btn"><Pin size={16} /></button>
                <button className="chat-action-btn"><Star size={16} /></button>
                <button className="chat-action-btn"><MoreVertical size={16} /></button>
                {isCompany && (
                  <Link to="/profile" className="btn-view-profile" style={{ color: '#4640de', fontWeight: 600, fontSize: '14px', textDecoration: 'none', marginLeft: '8px' }}>
                    View Profile
                  </Link>
                )}
              </div>
            </div>

            {/* Scrollable messages history container */}
            <div className="chat-messages-container">
              {/* Profile Intro section */}
              <div className="chat-welcome">
                <img
                  src={activeChat.avatar}
                  alt={activeChat.name}
                  className="chat-welcome-avatar"
                />
                <h4>{activeChat.name}</h4>
                <p>{activeChat.role}</p>
                <p className="chat-welcome-desc">
                  This is the very beginning of your direct message with {activeChat.name}
                </p>
              </div>

              {/* Day pill marker */}
              <div className="chat-day-divider">
                <div className="chat-day-pill">
                  <span>Today</span>
                  <ChevronDown size={14} />
                </div>
              </div>

              {/* List of messages in the active chat */}
              {activeChat.messages.map((msg) => {
                const isMe = msg.sender === 'me';
                return (
                  <div
                    key={msg.id}
                    className={`chat-msg-row ${
                      isMe ? 'chat-msg-row--sent' : 'chat-msg-row--received'
                    }`}
                  >
                    <img
                      src={isMe ? displayAvatar : activeChat.avatar}
                      alt={isMe ? 'You' : activeChat.name}
                      className="chat-msg-avatar"
                    />
                    <div className="chat-msg-content-wrapper">
                      <span className="chat-msg-author">{isMe ? 'You' : activeChat.name}</span>
                      <div className="chat-msg-bubble-group">
                        <div className="chat-msg-bubble">
                          {msg.text}
                        </div>
                      </div>
                      <span className="chat-msg-time">{msg.time}</span>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat bottom input bar */}
            <div className="chat-input-bar">
              <form onSubmit={handleSendMessage} className="chat-input-container">
                <button type="button" className="chat-input-btn">
                  <Paperclip size={18} />
                </button>
                <input
                  type="text"
                  placeholder="Reply message"
                  className="chat-text-input"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                />
                <button type="button" className="chat-input-btn">
                  <Smile size={18} />
                </button>
                <button type="submit" className="chat-send-btn">
                  <Send size={16} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}