import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  LayoutDashboard,
  MessageSquare,
  Building2,
  Users,
  Briefcase,
  Calendar,
  Settings,
  HelpCircle,
  Star,
  MoreVertical,
  Paperclip,
  Smile,
  Send,
  ChevronDown,
  Plus,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import NotificationPanel from '../components/NotificationPanel';
import './EmployerDashboard.css';
import './EmployerMessages.css';

export default function EmployerMessages() {
  const { user } = useAuth();
  const messagesEndRef = useRef(null);

  const displayName = user?.name || 'Maria Kelly';
  const displayEmail = user?.email || 'maria@email.com';
  const displayAvatar =
    user?.avatar ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=4640DE&color=fff&size=128&bold=true`;

  const [searchQuery, setSearchQuery] = useState('');
  const [activeChatId, setActiveChatId] = useState(1);
  const [inputMessage, setInputMessage] = useState('');

  const [chats, setChats] = useState([
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
          sender: 'them',
          text: 'Hey, I wanted to reach out because we saw your work contributions and were impressed by your skills.',
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
          text: 'Hi there, sure I would love to. Thanks for taking the time to see my work!',
          time: '11 mins ago',
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
        { id: 'm1', sender: 'them', text: 'Hey thanks for your consideration.', time: '3:40 PM' },
      ],
    },
    {
      id: 3,
      name: 'Ally Wales',
      role: 'Developer Candidate',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      time: '3:40 PM',
      unread: false,
      messages: [
        { id: 'm1', sender: 'them', text: 'Looking forward to the interview.', time: '3:40 PM' },
      ],
    },
    {
      id: 4,
      name: 'James Gardner',
      role: 'Product Candidate',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
      time: '3:40 PM',
      unread: false,
      messages: [
        { id: 'm1', sender: 'them', text: 'Thanks for reaching out!', time: '3:40 PM' },
      ],
    },
    {
      id: 5,
      name: 'Allison Geidt',
      role: 'HR Candidate',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80',
      time: '3:40 PM',
      unread: false,
      messages: [
        { id: 'm1', sender: 'them', text: 'Let\u2019s schedule a second round next week.', time: '3:40 PM' },
      ],
    },
    {
      id: 6,
      name: 'Ruben Culhane',
      role: 'Design Candidate',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
      time: '3:40 PM',
      unread: false,
      messages: [
        { id: 'm1', sender: 'them', text: 'Thank you for your time today.', time: '3:40 PM' },
      ],
    },
    {
      id: 7,
      name: 'Lydia Diaz',
      role: 'Sales Candidate',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      time: '3:40 PM',
      unread: false,
      messages: [
        { id: 'm1', sender: 'them', text: 'Happy to answer any questions.', time: '3:40 PM' },
      ],
    },
    {
      id: 8,
      name: 'Angelina Swann',
      role: 'Support Candidate',
      avatar: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=150&auto=format&fit=crop&q=80',
      time: '3:40 PM',
      unread: false,
      messages: [
        { id: 'm1', sender: 'them', text: 'Thanks, we will reach out soon.', time: '3:40 PM' },
      ],
    },
  ]);

  const activeChat = chats.find((c) => c.id === activeChatId) || chats[0];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChat.messages]);

  const handleSelectChat = (id) => {
    setActiveChatId(id);
    setChats(chats.map((c) => (c.id === id ? { ...c, unread: false } : c)));
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
      chats.map((c) =>
        c.id === activeChatId
          ? { ...c, time: 'Just now', messages: [...c.messages, newMessage] }
          : c
      )
    );
    setInputMessage('');
  };

  const filteredChats = chats.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const menuItems = [
    { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/employer/dashboard' },
    { key: 'messages', label: 'Messages', icon: MessageSquare, badge: 1, href: '/employer/messages' },
    { key: 'company-profile', label: 'Company Profile', icon: Building2, href: '/employer/company-profile' },
    { key: 'all-applicants', label: 'All Applicants', icon: Users, href: '/employer/applicants' },
    { key: 'job-listing', label: 'Job Listing', icon: Briefcase, href: '/employer/job-listing' },
    { key: 'my-schedule', label: 'My Schedule', icon: Calendar, href: '/employer/my-schedule' },
  ];

  const settingItems = [
    { key: 'settings', label: 'Settings', icon: Settings, href: '/employer/settings' },
    { key: 'help', label: 'Help Center', icon: HelpCircle, href: '/help' },
  ];

  return (
    <div className="dashboard-page">
      {/* Sidebar Navigation */}
      <aside className="dashboard-sidebar">
        <Link to="/" className="sidebar-logo">
          <span className="sidebar-logo-dot" />
          JobHuntly
        </Link>

        <nav className="sidebar-menu">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.key}
                to={item.href}
                className={`sidebar-item ${item.key === 'messages' ? 'sidebar-item--active' : ''}`}
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
              <Link key={item.key} to={item.href} className="sidebar-item">
                <div className="sidebar-item-left">
                  <Icon size={18} />
                  <span>{item.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="sidebar-profile">
          <img src={displayAvatar} alt={displayName} className="sidebar-profile-avatar" />
          <div className="sidebar-profile-info">
            <span className="sidebar-profile-name">{displayName}</span>
            <span className="sidebar-profile-email" title={displayEmail}>
              {displayEmail}
            </span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main employer-main">
        {/* Header */}
        <header className="employer-header">
          <div className="employer-company-select">
            <div className="employer-company-logo">N</div>
            <div>
              <span className="employer-company-label">Company</span>
              <span className="employer-company-name">
                Nomad <ChevronDown size={14} />
              </span>
            </div>
          </div>
          <div className="employer-header-right">
            <button className="btn-post-job">
              <Plus size={16} /> Post a job
            </button>
            <NotificationPanel />
          </div>
        </header>

        <h1 className="employer-page-title">Messages</h1>

        {/* Chat Workspace split */}
        <div className="emp-chat-layout">
          {/* Left panel: candidates list */}
          <div className="emp-chat-list-panel">
            <div className="emp-chat-search-container">
              <Search className="emp-chat-search-icon" size={18} />
              <input
                type="text"
                placeholder="Search messages"
                className="emp-chat-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="emp-chat-threads">
              {filteredChats.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => handleSelectChat(chat.id)}
                  className={`emp-chat-thread-item ${
                    activeChatId === chat.id ? 'emp-chat-thread-item--active' : ''
                  }`}
                >
                  <img src={chat.avatar} alt={chat.name} className="emp-chat-thread-avatar" />
                  <div className="emp-chat-thread-details">
                    <div className="emp-chat-thread-top">
                      <span className="emp-chat-thread-name">
                        {chat.name}
                        {chat.unread && <span className="emp-chat-thread-unread-dot" />}
                      </span>
                      <span className="emp-chat-thread-time">{chat.time}</span>
                    </div>
                    <p className="emp-chat-thread-preview">
                      {chat.messages[chat.messages.length - 1]?.text}
                    </p>
                  </div>
                </div>
              ))}
              {filteredChats.length === 0 && (
                <div className="emp-chat-empty">No messages found</div>
              )}
            </div>
          </div>

          {/* Right panel: chat window */}
          <div className="emp-chat-window-panel">
            <div className="emp-chat-window-header">
              <div className="emp-chat-header-profile">
                <img
                  src={activeChat.avatar}
                  alt={activeChat.name}
                  className="emp-chat-header-avatar"
                />
                <div className="emp-chat-header-name">
                  <h3>{activeChat.name}</h3>
                  <p>{activeChat.role}</p>
                </div>
              </div>
              <div className="emp-chat-header-actions">
                <button className="emp-chat-action-btn"><Star size={16} /></button>
                <button className="emp-chat-action-btn emp-chat-share-profile-btn">
                  Share Profile
                </button>
                <button className="emp-chat-action-btn"><MoreVertical size={16} /></button>
              </div>
            </div>

            <div className="emp-chat-messages-container">
              <div className="emp-chat-day-divider">
                <div className="emp-chat-day-pill">
                  <span>Today</span>
                  <ChevronDown size={14} />
                </div>
              </div>

              {activeChat.messages.map((msg) => {
                const isMe = msg.sender === 'me';
                return (
                  <div
                    key={msg.id}
                    className={`emp-chat-msg-row ${
                      isMe ? 'emp-chat-msg-row--sent' : 'emp-chat-msg-row--received'
                    }`}
                  >
                    <img
                      src={isMe ? displayAvatar : activeChat.avatar}
                      alt={isMe ? 'You' : activeChat.name}
                      className="emp-chat-msg-avatar"
                    />
                    <div className="emp-chat-msg-content-wrapper">
                      <span className="emp-chat-msg-author">
                        {isMe ? 'You' : activeChat.name}
                      </span>
                      <div className="emp-chat-msg-bubble">{msg.text}</div>
                      <span className="emp-chat-msg-time">{msg.time}</span>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            <div className="emp-chat-input-bar">
              <form onSubmit={handleSendMessage} className="emp-chat-input-container">
                <button type="button" className="emp-chat-input-btn">
                  <Paperclip size={18} />
                </button>
                <input
                  type="text"
                  placeholder="Reply message"
                  className="emp-chat-text-input"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                />
                <button type="button" className="emp-chat-input-btn">
                  <Smile size={18} />
                </button>
                <button type="submit" className="emp-chat-send-btn">
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