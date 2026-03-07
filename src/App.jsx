import React, { useReducer } from 'react';
import Home from './components/Home';
import Inserate from './components/Inserate';
import Favorite from './components/Favorite';
import Account from './components/Account';
import Nachrichten from './components/Nachrichten';
import AddItem from './components/AddItem';
import FlohmarktView from './components/FlohmarktView';
import Auth from './components/Auth';
import ItemView from './components/ItemView';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'leaflet/dist/leaflet.css';

// ─── State Shape ─────────────────────────────────────────────────────────────
const initialState = {
  isAuthenticated: false,
  currentPage: 'home',
  selectedEvent: null,
  selectedItem: null,
  isAdding: null,       // 'event' | 'item' | null
  showSelection: false,
  isChatOpen: false,
};

// ─── Reducer ──────────────────────────────────────────────────────────────────
function appReducer(state, action) {
  switch (action.type) {

    case 'NAVIGATE':
      // Navigate to a main page and reset all overlay/modal states
      return {
        ...state,
        currentPage: action.page,
        selectedEvent: null,
        selectedItem: null,
        isAdding: null,
        isChatOpen: false,
      };

    case 'LOGIN':
      return { ...state, isAuthenticated: true };

    case 'SELECT_EVENT':
      return { ...state, selectedEvent: action.event };

    case 'CLEAR_EVENT':
      return { ...state, selectedEvent: null };

    case 'SELECT_ITEM':
      return { ...state, selectedItem: action.item };

    case 'CLEAR_ITEM':
      return { ...state, selectedItem: null };

    case 'START_ADDING':
      // 'event' or 'item'
      return { ...state, isAdding: action.kind, showSelection: false };

    case 'STOP_ADDING':
      return { ...state, isAdding: null };

    case 'SHOW_SELECTION':
      return { ...state, showSelection: true };

    case 'HIDE_SELECTION':
      return { ...state, showSelection: false };

    case 'SET_CHAT_OPEN':
      return { ...state, isChatOpen: action.open };

    default:
      return state;
  }
}

// ─── PageRouter ───────────────────────────────────────────────────────────────
// Renders the correct screen based on current app state.
// Priority order: AddItem → FlohmarktView → ItemView → main pages
function PageRouter({ state, dispatch }) {
  const navigate = (page) => dispatch({ type: 'NAVIGATE', page });

  // 1. Overlay screens – these take priority over the bottom navigation
  if (state.isAdding) {
    return (
      <AddItem
        type={state.isAdding}
        onCancel={() => dispatch({ type: 'STOP_ADDING' })}
        onSave={() => dispatch({ type: 'STOP_ADDING' })}
      />
    );
  }

  if (state.selectedEvent) {
    return (
      <FlohmarktView
        event={state.selectedEvent}
        onBack={() => dispatch({ type: 'CLEAR_EVENT' })}
      />
    );
  }

  if (state.selectedItem) {
    return (
      <ItemView
        item={state.selectedItem}
        onBack={() => dispatch({ type: 'CLEAR_ITEM' })}
        onChatClick={() => {
          dispatch({ type: 'CLEAR_ITEM' });
          navigate('messages');
        }}
      />
    );
  }

  // 2. Main pages – switched via bottom navigation
  switch (state.currentPage) {
    case 'home':
      return (
        <Home
          onEventClick={(event) => dispatch({ type: 'SELECT_EVENT', event })}
          onChatClick={() => navigate('messages')}
        />
      );

    case 'inserate':
      return (
        <Inserate
          onItemClick={(item) => dispatch({ type: 'SELECT_ITEM', item })}
          onChatClick={() => navigate('messages')}
        />
      );

    case 'favorite':
      return <Favorite />;

    case 'messages':
      return (
        <Nachrichten
          onChatStateChange={(open) => dispatch({ type: 'SET_CHAT_OPEN', open })}
        />
      );

    case 'account':
      return state.isAuthenticated ? (
        <Account />
      ) : (
        <Auth
          onLogin={() => dispatch({ type: 'LOGIN' })}
          onBackToHome={() => navigate('home')}
        />
      );

    default:
      return (
        <Home
          onEventClick={(event) => dispatch({ type: 'SELECT_EVENT', event })}
          onChatClick={() => navigate('messages')}
        />
      );
  }
}

// ─── App ──────────────────────────────────────────────────────────────────────
function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const navigate = (page) => dispatch({ type: 'NAVIGATE', page });

  // Bottom nav is hidden when: an overlay is active, chat is open,
  // or the user is on the account page but not yet authenticated
  const showNav =
    !state.isAdding &&
    !state.selectedEvent &&
    !state.selectedItem &&
    !state.isChatOpen &&
    (state.currentPage !== 'account' || state.isAuthenticated);

  return (
    <div className="App bg-[#F8FAFC] min-h-screen">
      <main>
        <PageRouter state={state} dispatch={dispatch} />
      </main>

      {/* ── Bottom Navigation ── */}
      {showNav && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-100 z-[2000]">
          <div className="max-w-[1080px] mx-auto px-6 py-4 flex justify-between items-center">

            <NavItem
              icon="house-door-fill"
              label="Flohmärkte"
              active={state.currentPage === 'home'}
              onClick={() => navigate('home')}
            />

            <NavItem
              icon="tag-fill"
              label="Inserate"
              active={state.currentPage === 'inserate'}
              onClick={() => navigate('inserate')}
            />

            {/* Center add button */}
            <div className="relative -top-3">
              <button
                onClick={() => dispatch({ type: 'SHOW_SELECTION' })}
                className="bg-[#3D5A80] text-white w-16 h-16 rounded-full flex items-center justify-center shadow-xl border-4 border-white text-3xl active:scale-90 transition-all"
              >
                <i className="bi bi-plus-lg" />
              </button>
            </div>

            <NavItem
              icon="heart-fill"
              label="Favoriten"
              active={state.currentPage === 'favorite'}
              onClick={() => navigate('favorite')}
            />

            <NavItem
              icon="person-fill"
              label="Account"
              active={state.currentPage === 'account'}
              onClick={() => navigate('account')}
            />

          </div>
        </nav>
      )}

      {/* ── Create Modal: choose between Flohmarkt or Inserat ── */}
      {state.showSelection && (
        <div
          className="fixed inset-0 z-[3000] flex items-end justify-center px-4 pb-24 bg-slate-900/40 backdrop-blur-sm"
          onClick={() => dispatch({ type: 'HIDE_SELECTION' })}
        >
          <div
            className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl animate-in slide-in-from-bottom duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-800">Was möchtest du erstellen?</h3>
              <button
                onClick={() => dispatch({ type: 'HIDE_SELECTION' })}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <i className="bi bi-x-lg" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <CreateButton
                icon="calendar-event"
                label="Flohmarkt"
                color="blue"
                onClick={() => dispatch({ type: 'START_ADDING', kind: 'event' })}
              />
              <CreateButton
                icon="tag"
                label="Inserat"
                color="orange"
                onClick={() => dispatch({ type: 'START_ADDING', kind: 'item' })}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Small Reusable Components ────────────────────────────────────────────────

// Single item in the bottom navigation bar
function NavItem({ icon, label, active, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`flex flex-col items-center gap-1 cursor-pointer ${active ? 'text-[#52A7E0]' : 'opacity-40'}`}
    >
      <div className={`px-4 py-1.5 rounded-2xl ${active ? 'bg-[#52A7E0] text-white shadow-sm' : ''}`}>
        <i className={`bi bi-${icon} text-lg`} />
      </div>
      <span className="text-[10px] font-bold uppercase tracking-tighter text-center">{label}</span>
    </div>
  );
}

// Button inside the "create" modal
function CreateButton({ icon, label, color, onClick }) {
  const colors = {
    blue:   { wrap: 'bg-blue-50 border-blue-100 hover:border-blue-400',     icon: 'bg-blue-500',   text: 'text-blue-900' },
    orange: { wrap: 'bg-orange-50 border-orange-100 hover:border-orange-400', icon: 'bg-orange-500', text: 'text-orange-900' },
  };
  const c = colors[color];
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all group ${c.wrap}`}
    >
      <div className={`w-12 h-12 rounded-xl text-white flex items-center justify-center text-2xl shadow-lg group-active:scale-90 ${c.icon}`}>
        <i className={`bi bi-${icon}`} />
      </div>
      <span className={`font-bold ${c.text}`}>{label}</span>
    </button>
  );
}

export default App;
